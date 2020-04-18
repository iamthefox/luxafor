import resolveDevices from "./util/resolveDevices";
import * as constants from "./util/constants";

export default {
  devices: resolveDevices,
  device: () => resolveDevices().shift(),
  constants,
};
