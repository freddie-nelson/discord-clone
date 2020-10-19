<template>
  <button class="button" @mouseenter="$emit('hover', [$event, home ? 'Home' : server.name || 'Add a Server'])" @mouseleave="$emit('leave')">
        <div class="bar"></div>
        <div class="button__icon" :style="{ transform: home ? 'scale(1.07)' : null, backgroundColor: add ? '#12151C' : null }">
            <img v-if="home" src="../assets/home.svg" alt="">
            <img v-else-if="add" src="../assets/plus.svg" class="add" alt="">
            <img v-else :src="server.icon" alt="">
        </div>
    </button>
</template>

<script>
export default {
    name: "ServerButton",
    props: {
        home: {
            type: Boolean,
            default: false
        },
        add: {
            type: Boolean,
            default: false
        },
        server: {
            type: Object,
            default() {
                return {};
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.button {
    margin: 0px;
    margin-bottom: 7px;
    position: relative;
    display: flex;
    align-items: center;
    
    &:focus {
        outline: none;
    }

    &__icon {
        --size: 37px;
        border-radius: 50%;
        transition: border-radius;
        width: var(--size);
        height: var(--size);
        transition: border-radius 0.2s ease;
        position: relative;
        margin: auto;
        overflow: hidden;

        img {
            transform: scale(1.1);
        }

        .add {
            width: 100%;
            height: 100%;
            transform: scale(.66);
        }
    }

    .bar {
        width: 4px;
        height: 15px;
        background-color: white;
        position: absolute;
        border-radius: 0 3px 3px 0;
        opacity: 0;
        transition: opacity .2s ease;
    }

    &:hover {
        .bar {
            opacity: 1;
        }

        .button__icon {
            border-radius: 35%;
        }
    }
}
</style>