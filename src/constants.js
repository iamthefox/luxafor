module.exports = {

    // commands available
    commands: {
        COMMAND_SETCOLOR: 1,
        COMMAND_FADETO: 2,
        COMMAND_FLASH: 3,
        COMMAND_WAVE: 4
    },

    // targets, literally single or multiple led address
    targets: {
        all: 0xFF,
        top: 0x41,
        bottom: 0x42,
        getLedByNumber: function (number) {
            switch (number) {
                case 1:
                    return 0x01;
                    break;
                case 2:
                    return 0x02;
                    break;
                case 3:
                    return 0x03;
                    break;
                case 4:
                    return 0x04;
                    break;
                case 5:
                    return 0x05;
                    break;
                case 6:
                    return 0x06;
                    break;
            }
        }
    },

    // wave types available
    waveTypes: {
        singleSmall: 1,
        singleLarge: 2,
        doubleSmall: 3,
        doubleLarge: 4
    }
};