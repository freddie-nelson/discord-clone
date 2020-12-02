<template>
    <section id="server-list">
        <div class="list">
            <ServerButton :home="true" @hover="showTooltip" @leave="hideTooltip" />
            <div class="seperator"></div>
            <ServerButton v-for="server in servers" :key="server.id" :server="server" @hover="showTooltip" @leave="hideTooltip" style="margin-bottom: 7px;" />
            <ServerButton :add="true" @hover="showTooltip" @leave="hideTooltip" />
        </div>
        <transition name="fade">
            <div ref="tooltipElement" v-show="tooltip" :style="{ top: tooltipY + 'px' }" class="tooltip">
                <p class="leading-none">{{ this.tooltipText }}</p>
            </div>
        </transition>
    </section>
</template>

<script>
import ServerButton from "./ServerButton"

export default {
    name: "ServerList",
    components: {
        ServerButton
    },
    data() {
        return {
            tooltipY: 0,
            tooltip: false,
            tooltipText: "Home",
            servers: []
        }
    },
    methods: {
        showTooltip(arr) {
            const element = arr[0].target;
            this.tooltipText = arr[1];
            this.tooltipY = (element.getBoundingClientRect().top + element.clientHeight / 2) - (this.$refs.tooltipElement.clientHeight || 34)  / 2;
            this.tooltip = true;
        },
        hideTooltip() {
            this.tooltip = false;
        }
    }
}
</script>

<style scoped lang="scss">
#server-list::-webkit-scrollbar {
  display: none;
}

#server-list {
    width: 57px;
    height: 100vh;
    overflow-y: scroll;
    background-color: #181C25;
    padding-top: 10px;
}

.list {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.tooltip {
    top: 0;
    left: 64px;
    background: linear-gradient(-45deg, #603DB6 0%, #4050B5 100%);
    padding: 10px;
    letter-spacing: 0.03em;
    font-weight: bold;
    color: white;
    position: absolute;
    border-radius: 0.3rem;
    font-size: 1.04em;
    z-index: 100;
    box-shadow: 0px 0px 17px 0px rgba(0,0,0,0.25);
}

.seperator {
    background-color: white;
    width: 55%;
    height: 2px;
    opacity: 0.1;
    margin: 0 auto;
    border-radius: 1px;
    margin-bottom: 7px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>