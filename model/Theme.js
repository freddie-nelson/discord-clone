const mongoose = require("mongoose");
const joi = require("@hapi/joi");

const themeSchema = new mongoose.Schema({
  colors: {
    type: Object,
    required: true,
    validate(value) {
      const requiredProps = [
        "accentColor",
        "accentColorSecondary",
        "alertHoverColor",
        "darkBg",
        "iconColor",
        "lighterBg",
        "mainBg",
        "navbarLogoBg",
        "primaryText",
        "secondaryText"
      ];

      const props = Object.keys(value);
      let valid = true;

      for (let i = 0; i < requiredProps.length; i++) {
        const prop = requiredProps[i];

        if (props.indexOf(prop) > -1) {
          value[prop].length === 9 ? null : (valid = false);
        } else {
          valid = false;
        }

        if (!valid) {
          break;
        }
      }

      return valid;
    }
  },
  creator: {
    type: String,
    required: true,
    min: 1,
    max: 64
  },
  creatorId: {
    type: String,
    required: true,
    min: 36,
    max: 36
  },
  description: {
    type: String,
    required: true,
    min: 8,
    max: 30
  },
  name: {
    type: String,
    required: true,
    min: 4
  },
  type: {
    type: String,
    required: true,
    enum: ["Dark", "Light"]
  },
  downloads: {
    type: Number,
    required: true,
    default: 0
  },
  featured: {
    type: Boolean,
    required: true,
    default: false
  },
  dateCreated: {
      type: Date,
      required: true,
      default: Date.now
  }
});

module.exports = mongoose.model("Theme", themeSchema, "themes");