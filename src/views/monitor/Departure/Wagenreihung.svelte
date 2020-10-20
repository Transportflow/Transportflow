<script>
    import Spinner from "svelte-spinner";
    import {getWagenreihung} from "../../../data";
    import {_} from "svelte-i18n";

    export let lineName;
    export let plannedDeparture;

    let trainSectors = [];
    let loading = true;

    getWagenreihung(lineName, plannedDeparture, (err) => {
        loading = false;
    }).then(res => {
        if (res == null) {
            loading = false;
            return;
        }
        let sectors = [];
        let currentSector = {
            name: "",
            wagons: []
        };
        res.wagons.forEach((wagon, index) => {
            if (wagon.fahrzeugsektor !== currentSector.name) {
                if (currentSector.name !== "")
                    sectors.push(Object.assign({}, currentSector));
                currentSector = {
                    name: wagon.fahrzeugsektor,
                    wagons: []
                }
            }
            if (wagon.type === "LOK" || wagon.type.includes("STEUERWAGEN") || wagon.type === "TRIEBKOPF") {
                if (index === 0) {
                    wagon.orientation = "left";
                } else if (index === res.wagons.length-1) {
                    wagon.orientation = "right";
                } else if (
                        res.wagons[index-1].type === "LOK" ||
                        res.wagons[index-1].type.includes("STEUERWAGEN") ||
                        res.wagons[index-1].type.includes("TRIEBKOPF")
                ) {
                    wagon.orientation = "left";
                } else {
                    wagon.orientation = "right";
                }
            } else {
                wagon.orientation = "";
            }

            wagon.dining = wagon.type.includes("SPEISEWAGEN");
            if (wagon.wagonNumber == null)
                wagon.wagonNumber = "";

            currentSector.wagons.push(wagon);
        });
        if (currentSector.wagons.length > 0)
            sectors.push(Object.assign({}, currentSector));

        trainSectors = sectors
        loading = false;
    })
</script>

{#if loading}
<p class="flex">
    <Spinner size="30" speed="1000" color="#85cb37" thickness="2" gap="40"/>
    <span class="my-auto">{$_('departures.loading_wagons')}</span>
</p>
{:else if trainSectors.length > 0}
    <div class="station">
        <div class="platform scrollbar-none scrolling-touch">
            {#each trainSectors as sector}
                <div class="platform-part">
                    <div class="platform-id">{sector.name}</div>
                    <div class="wagon-wrapper">
                        {#each sector.wagons as wagon}
                            {#if wagon.orientation === "left"}
                                <div class={"wagon engine-left" + (wagon.type.includes("ERSTEKLASSE") ? " first-class" : "")}>
                                    <div class="wagon-parts">
                                        <div class="triangle-top"></div>
                                        <div class="triangle-back">
                                            <div class="triangle-inside"></div>
                                        </div>
                                        <div class="box">{wagon.wagonNumber}</div>
                                    </div>
                                </div>
                            {:else if wagon.orientation === ""}
                                <div class={"wagon" + (wagon.type.includes("ERSTEKLASSE") ? " first-class" : "")}>
                                    <div class="wagon-parts">
                                        <div class="box">{@html wagon.dining === true ? "<ion-icon name=\"restaurant\"></ion-icon>" : wagon.wagonNumber}</div>
                                    </div>
                                </div>
                            {:else if wagon.orientation === "right"}
                                <div class={"wagon engine-right" + (wagon.type.includes("ERSTEKLASSE") ? " first-class" : "")}>
                                    <div class="wagon-parts">
                                        <div class="box">{wagon.wagonNumber}</div>
                                        <div class="triangle-top"></div>
                                        <div class="triangle-back">
                                            <div class="triangle-inside"></div>
                                        </div>
                                    </div>
                                </div>
                            {/if}
                        {/each}
                    </div>
                </div>
            {/each}
        </div>
    </div>
{/if}

<style>

    .station {
        position: relative;
        width: 100%;
        height: 70px;
        /*resize: both;*/
    }

    .platform {
        position: relative;
        width: 100%;
        height: 100%;
        /*transform: scale(0.5);*/
        /*transform-origin: top left;*/
        display: flex;
        flex-wrap: nowrap;
        overflow-x: scroll;
        overflow-y: hidden;
    }

    .platform-part .platform-id {
        width: 100%;
        margin-bottom: 0;
        font-size: 16px;
        text-align: center;
        font-weight: 700;
    }

    .wagon-wrapper {
        display: flex;
        flex-wrap: nowrap;
    }

    .wagon {
        min-width: 55px;
        margin: 0 2px;
    }

    .wagon.engine-left,
    .wagon.engine-right {
        min-width: 73px;
    }

    .wagon.engine-right {
        margin-right: 5px;
    }

    .wagon-parts {
        position: relative;
        height: 25px;
    }

    .wagon .wagon-parts > .box {
        position: absolute;
        height: 25px;
        width: 55px;
        border: 2px solid;
        border-color: #1a202c transparent #1a202c transparent;
        top: 0px;
        font-size: 16px;
        text-align: center;
        line-height: 22px;
        font-weight: 400;
        z-index: 10;
    }

    .wagon .wagon-parts > .triangle-back {
        position: absolute;
        height: 25px;
        width: 30px;
        border: 2px solid #1a202c;
        border-color: transparent transparent #1a202c;
        overflow: hidden;
        z-index: 10;
    }

    .wagon .wagon-parts > .triangle-top,
    .wagon.first-class .wagon-parts > .triangle-back .triangle-inside {
        position: absolute;
        top: 0.5px;
        height: 50px;
        width: 40px;
        border: 2px solid;
        border-radius: 15px;
        border-color: #1a202c transparent transparent transparent;
    }

    .wagon.engine-left .wagon-parts > .triangle-top,
    .wagon.engine-left .wagon-parts > .triangle-back .triangle-inside {
        left: 4.5px;
        transform: rotate(-46deg);
    }

    .wagon.engine-left .wagon-parts > .triangle-back .triangle-inside {
        left: 6.5px;
    }

    .wagon.engine-left .wagon-parts > .triangle-back {
        left: -4.25px;
        border-radius: 0 0 0 10px;
    }

    .wagon.engine-left .wagon-parts > .box {
        left: 18px;
    }

    .wagon.engine-right .wagon-parts > .triangle-top,
    .wagon.engine-right .wagon-parts > .triangle-back .triangle-inside {
        right: 4.5px;
        transform: rotate(46deg);
    }

    .wagon.engine-right .wagon-parts > .triangle-back .triangle-inside {
        right: 6.5px;
    }

    .wagon.engine-right .wagon-parts > .triangle-back {
        right: -4.25px;
        border-radius: 0 0 10px 0;
    }

    .wagon.engine-right .wagon-parts > .box {
        left: 0;
    }

    .wagon.first-class .box,
    .wagon.first-class.engine-right .triangle-inside,
    .wagon.first-class.engine-left .triangle-inside {
        background-color: #1a202c;
        color: white;
    }
</style>
