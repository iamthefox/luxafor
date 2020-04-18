import { devices, HID } from "node-hid";
import { DEVICE_VID, DEVICE_PID } from "./constants";
import Device from "../Device";

export default () =>
  devices()
    .filter(
      ({ vendorId, productId }) =>
        vendorId === DEVICE_VID && productId === DEVICE_PID
    )
    .map((device) => new Device(new HID(device.path)));
