<template>
  <router-link
    class="view-btn"
    :class="{ active }"
    @click.native="$emit('click', dm.id || type)"
    @mouseenter.native="hover = true"
    @mouseleave.native="hover = false"
    :to="'/' + (dm.name ? 'chat' : type)"
  >
    <div class="container">
      <svg
        v-if="type === 'friends'"
        class="icon"
        width="16"
        height="16"
        viewBox="0 0 24 24"
      >
        <g fill="none" fill-rule="evenodd">
          <path
            fill="currentColor"
            fill-rule="nonzero"
            d="M2.5 4v1.5c0 4.15 2.21 7.78 5.5 9.8V20h15v-2c0-2.66-5.33-4-8-4h-.25C10 14 6 10 6 5.5V4H2.5zM15 4c-2.209139 0-4 1.790861-4 4s1.790861 4 4 4 4-1.790861 4-4-1.790861-4-4-4z"
          />
          <path d="M0 0h24v24H0V0zm0 0h24v24H0V0zm0 0h24v24H0V0z" />
        </g>
      </svg>
      <svg v-else-if="type === 'library'" class="icon" width="24" height="24">
        <path
          fill="currentColor"
          d="M17 13.6h.3999992c1.6406743 0 3.0967818-.7902246 4.0084765-2.0108278l.4114004 7.2406477c.0939879 1.6541863-1.1708028 3.0713615-2.8249891 3.1653493A2.99996552 2.99996552 0 0118.8247069 22H5.1752931c-1.65685425 0-3-1.3431458-3-3 0-.056761.00161091-.1135105.00483077-.1701801l.41140038-7.2406467C3.503219 12.8097758 4.95932613 13.6 6.6 13.6H7V15h2v-1.4h6V15h2v-1.4zM7 16v2h2v-2H7zm8 0h2v2h-2v-2zm0-4.4H9V9H7v2.6h-.4c-1.65685425 0-3-1.3431458-3-3V5c0-1.65685425 1.34314575-3 3-3h10.7999992c1.6568543 0 3 1.34314575 3 3v3.6c0 1.6568542-1.3431457 3-3 3H17V9h-2v2.6z"
          fill-rule="evenodd"
        />
      </svg>
      <svg v-else-if="type === 'nitro'" class="icon" width="24" height="24">
        <path
          fill="currentColor"
          d="M2.98966977 9.35789159c0 .41793313-.35524031.76615501-.7815969.76615501h-.42635659c-.42635659 0-.78176744-.34822188-.78176744-.76615501s.35541085-.76615501.78176744-.76615501h.42635659c.42635659 0 .7815969.34822188.7815969.76615501zm19.25709453-.20896656c1.8474884 3.83110937.1420621 8.42837387-3.9083255 10.23936167-3.9081551 1.7414438-8.59807756.0697113-10.3746202-3.7613981-.35524031-.7661551-.5684186-1.6020213-.63953488-2.4378876H5.76091938c-.42635659 0-.7815969-.348389-.7815969-.7663222 0-.4179331.35524031-.766155.7815969-.766155h2.2740155c.42635659 0 .7815969-.3482219.7815969-.766155 0-.4179331-.35524031-.7663222-.7815969-.7663222h-3.624031c-.42635659 0-.78176745-.34822188-.78176745-.76615501s.35541086-.76615501.78176745-.76615501h5.04516279c.42635659 0 .78159693-.34838906.78159693-.76632219 0-.41793313-.35524034-.76615502-.78159693-.76615502H7.3954c-.63953488 0-1.20812403-.48764438-1.20812403-1.18408814 0-.6268997.49747287-1.18425532 1.20812403-1.18425532h8.0296589c2.8424341.13942249 5.5426357 1.74144377 6.8217054 4.45800912zm-8.9804682-.76836171c-2.2468992 1.01139818-3.232124 3.61679328-2.2003411 5.81930088 1.031783 2.2025076 3.68969 3.1682675 5.9365892 2.1568693 2.2470698-1.0113981 3.232124-3.6167933 2.2003411-5.8193009-1.031783-2.20250757-3.68969-3.16826745-5.9365892-2.15686928zm3.5799628 1.4649225l1.4211318 2.36834348c.0711163.1392553.0711163.2089665 0 .3482219l-1.4211318 2.3683434c-.0711163.1392553-.2131783.1392553-.2842946.1392553h-2.7713178c-.142062 0-.2131783-.0697112-.284124-.1392553l-1.4213023-2.3683434c-.0709458-.1392554-.0709458-.2089666 0-.3482219l1.4213023-2.36834348c.0709457-.13925532.2131783-.13925532.284124-.13925532h2.7713178c.1422326-.06971125.2131783 0 .2842946.13925532z"
        />
      </svg>
      <div
        v-else
        class="icon"
        style="
          background-color: rgb(44 51 66);
          border-radius: 50%;
          transform: scale(1.26);
        "
      >
        {{ dm.name[0] }}
      </div>
      <h1>
        {{
          dm.name
            ? dm.name
            : type === "friends"
            ? "Friends"
            : type === "library"
            ? "Library"
            : "Nitro"
        }}
      </h1>
      <img v-if="dm.name" class="close" src="../../assets/plus.svg" alt="" />
    </div>
    <transition name="slide">
      <div v-if="hover || active" class="bar" />
    </transition>
  </router-link>
</template>

<script>
export default {
  name: "ViewButton",
  data() {
    return {
      hover: false,
    };
  },
  props: {
    type: {
      type: String,
      default: "",
    },
    active: {
      type: Boolean,
      default: false,
    },
    dm: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.slide-enter,
.slide-leave-to {
  transform: translateX(-150%);
}

.view-btn {
  margin: 5px 0px;
  width: 100%;
  height: 42px;
  display: flex;
  border-radius: 5px 5px 0 0;
  padding: 0px 10px;
  flex-direction: column;
  outline: none;
  transition: background-color 0.2s ease;

  .close {
    filter: brightness(10);
    transform: rotate(45deg);
    opacity: 0;
    margin-left: auto;
    transition: opacity 0.15s ease;

    &:hover {
      opacity: 0.7;
    }
  }

  .container {
    display: flex;
    align-items: center;
    height: 40px;
    width: 100%;
  }

  .icon {
    width: 24px;
    height: 24px;
    margin-right: 14px;
    color: #008ae6;
    text-align: center;
    vertical-align: center;
  }

  h1 {
    font-size: 16px;
    font-weight: 600;
    line-height: 20px;
    opacity: 0.9;
  }

  .bar {
    width: calc(100% + 20px);
    margin-left: -10px;
    height: 2px;
    background: linear-gradient(90deg, #0095d7 0%, #00d795 100%);
    transition: transform 0.3s ease;
  }

  &:hover {
    background-color: #0b0d11;

    .close {
      opacity: 0.5;

      &:hover {
        opacity: 0.8;
      }
    }
  }

  &.active {
    background: linear-gradient(-90deg, #603db6 0%, #4050b5 100%);
  }
}
</style>