import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import {terser} from 'rollup-plugin-terser';
import sveltePreprocess from 'svelte-preprocess';
import replace from '@rollup/plugin-replace';
import json from "rollup-plugin-json";

const production = !process.env.ROLLUP_WATCH;

require('dotenv').config()

export default {
    input: 'src/main.js',
    output: {
        sourcemap: true,
        format: 'iife',
        name: 'app',
        file: 'public/build/bundle.js'
    },
    plugins: [
        svelte({
            preprocess: sveltePreprocess({postcss: true}),
            // enable run-time checks when not in production
            dev: !production,
            // we'll extract any component CSS out into
            // a separate file - better for performance
            css: css => {
                css.write('public/build/bundle.css');
            }
        }),

        json(),

        replace({
            "process.env.NODE_ENV": production ? "'production'" : "'development'",
            process: JSON.stringify({
                env: {
                    VERSION: process.env.VERSION || "0.0.0",
                    BACKEND_URL: process.env.BACKEND_URL || "https://backend.transportflow.online",
                    MAPBOX_TOKEN: process.env.MAPBOX_TOKEN,
                    IMPRESS_RESPONSIBLE: process.env.IMPRESS_RESPONSIBLE,
                    IMPRESS_STREET: process.env.IMPRESS_STREET,
                    IMPRESS_CITY: process.env.IMPRESS_CITY,
                    IMPRESS_PHONE: process.env.IMPRESS_PHONE,
                    IMPRESS_MAIL: process.env.IMPRESS_MAIL,
                }
            })
        }),

        // If you have external dependencies installed from
        // npm, you'll most likely need these plugins. In
        // some cases you'll need additional configuration -
        // consult the documentation for details:
        // https://github.com/rollup/plugins/tree/master/packages/commonjs
        resolve({
            browser: true,
            dedupe: ['svelte']
        }),
        commonjs(),

        // In dev mode, call `npm run start` once
        // the bundle has been generated
        !production && serve(),

        // Watch the `public` directory and refresh the
        // browser on changes when not in production
        !production && livereload('public'),

        // If we're building for production (npm run build
        // instead of npm run dev), minify
        production && terser()
    ],
    watch: {
        clearScreen: false
    }
};

function serve() {
    let started = false;

    return {
        writeBundle() {
            if (!started) {
                started = true;

                require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
                    stdio: ['ignore', 'inherit', 'inherit'],
                    shell: true
                });
            }
        }
    };
}
