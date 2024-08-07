export type EasingFunction = (valueToEase: number) => number;

/** #CREDITS https://easings.net */
export const EasingFunction = {
    linear: (valueToEase: number): number => valueToEase,

    easeInVeryWeak: (valueToEase: number): number => 1 - Math.cos((valueToEase * Math.PI) / 2),
    easeInWeak: (valueToEase: number): number => Math.pow(valueToEase, 2),
    easeIn: (valueToEase: number): number => Math.pow(valueToEase, 3),
    easeInStrong: (valueToEase: number): number => Math.pow(valueToEase, 4),
    easeInVeryStrong: (valueToEase: number): number => Math.pow(valueToEase, 5),

    easeOutVeryWeak: (valueToEase: number): number => Math.sin((valueToEase * Math.PI) / 2),
    easeOutWeak: (valueToEase: number): number => 1 - Math.pow(1 - valueToEase, 2),
    easeOut: (valueToEase: number): number => 1 - Math.pow(1 - valueToEase, 3),
    easeOutStrong: (valueToEase: number): number => 1 - Math.pow(1 - valueToEase, 4),
    easeOutVeryStrong: (valueToEase: number): number => 1 - Math.pow(1 - valueToEase, 5),

    easeInOutVeryWeak: (valueToEase: number): number => -(Math.cos(valueToEase * Math.PI) - 1) / 2,
    easeInOutWeak: (valueToEase: number): number => valueToEase < 0.5 ? 2 * Math.pow(valueToEase, 2) : 1 - Math.pow(-2 * valueToEase + 2, 2) / 2,
    easeInOut: (valueToEase: number): number => valueToEase < 0.5 ? 4 * Math.pow(valueToEase, 3) : 1 - Math.pow(-2 * valueToEase + 2, 3) / 2,
    easeInOutStrong: (valueToEase: number): number => valueToEase < 0.5 ? 8 * Math.pow(valueToEase, 4) : 1 - Math.pow(-2 * valueToEase + 2, 4) / 2,
    easeInOutVeryStrong: (valueToEase: number): number => valueToEase < 0.5 ? 16 * Math.pow(valueToEase, 5) : 1 - Math.pow(-2 * valueToEase + 2, 5) / 2
} as const;

export enum EasingFunctionName {
    LINEAR = "Linear",

    EASE_IN_VERY_WEAK = "Ease In Very Weak",
    EASE_IN_WEAK = "Ease In Weak",
    EASE_IN = "Ease In",
    EASE_IN_STRONG = "Ease In Strong",
    EASE_IN_VERY_STRONG = "Ease In Very Strong",

    EASE_OUT_VERY_WEAK = "Ease Out Very Weak",
    EASE_OUT_WEAK = "Ease Out Weak",
    EASE_OUT = "Ease Out",
    EASE_OUT_STRONG = "Ease Out Strong",
    EASE_OUT_VERY_STRONG = "Ease Out Very Strong",

    EASE_IN_OUT_VERY_WEAK = "Ease In/Out Very Weak",
    EASE_IN_OUT_WEAK = "Ease In/Out Weak",
    EASE_IN_OUT = "Ease In/Out",
    EASE_IN_OUT_STRONG = "Ease In/Out Strong",
    EASE_IN_OUT_VERY_STRONG = "Ease In/Out Very Strong",
}

export type WaveFunction = (inputValue: number) => number;
export const WaveFunction = {
    triangleWave: (inputValue: number): number => (2 / Math.PI) * Math.asin(Math.sin((Math.PI / 2) * inputValue)),
    positiveTriangleWave: (inputValue: number): number => 1 - Math.abs((Math.abs(inputValue) % 2) - 1)
} as const;

export const EPSILON: number = 0.000001;
export const EPSILON_SQUARED: number = EPSILON * EPSILON;
export const EPSILON_DEGREES: number = 0.00001;

export function clamp(value: number, start: number = -Number.MAX_VALUE, end: number = Number.MAX_VALUE): number {
    const min = Math.min(start, end);
    const max = Math.max(start, end);
    return Math.min(Math.max(value, min), max);
}

export function sign(value: number, zeroSign: number = 1): number {
    let sign = Math.sign(value);
    if (sign == 0) {
        sign = Math.sign(zeroSign);
    }
    return sign;
}

export function toDegrees(angle: number): number {
    return angle * (180 / Math.PI);
}

export function toRadians(angle: number): number {
    return angle * (Math.PI / 180);
}

export function roundDecimal(number: number, decimalPlaces: number): number {
    const factor = Math.pow(10, decimalPlaces);
    number = Math.round(number * factor) / factor;

    return number;
}

/** Start range value doesn't need to be lower than the end one, so you can map from `[0, 1]` to `[3, 2]`, where `3` is greater than `2` */
export function mapToRange(value: number, originRangeStart: number, originRangeEnd: number, newRangeStart: number, newRangeEnd: number): number {
    if (originRangeStart == originRangeEnd) {
        return newRangeStart;
    }

    const clampedValue = MathUtils.clamp(value, originRangeStart, originRangeEnd);

    if (clampedValue == originRangeStart) {
        return newRangeStart;
    } else if (clampedValue == originRangeEnd) {
        return newRangeEnd;
    }

    const newValue = newRangeStart + ((newRangeEnd - newRangeStart) / (originRangeEnd - originRangeStart)) * (clampedValue - originRangeStart);
    const clampedNewValue = MathUtils.clamp(newValue, newRangeStart, newRangeEnd);
    return clampedNewValue;
}

/** Range is `[0, 1)` */
export function random(): number;
/** Range is `[start, end)` */
export function random(start: number, end: number): number;
export function random(start: number = 0, end: number = 1): number {
    return Math.random() * (end - start) + start;
}

/** Range is `[start, end]` */
export function randomInt(start: number, end: number): number {
    const min = Math.min(start, end);
    const max = Math.max(start, end);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function randomBool(): boolean {
    return MathUtils.randomInt(0, 1) == 0;
}

/** Return `1` or `-1` */
export function randomSign(): number {
    return (Math.random() < 0.5) ? 1 : -1;
}

/** You give it a list of parameters and returns a random one */
export function randomPick<T>(array: T[]): T | null;
export function randomPick<T>(...args: T[]): T | null;
export function randomPick<T>(...args: T[]): T | null {
    let random: T | null = null;

    if (args.length > 0) {
        if (args.length == 1 && (args[0] as T[]).length != null) {
            const arrayArg0 = args[0] as T[];
            if (arrayArg0.length > 0) {
                const randomIndex = MathUtils.randomInt(0, arrayArg0.length - 1);
                random = arrayArg0[randomIndex];
            }
        } else {
            const randomIndex = MathUtils.randomInt(0, args.length - 1);
            random = args[randomIndex];
        }
    }

    return random;
}

export const randomUUID = function () {
    const uuidRandomValues = new Uint8Array(1);
    const uuidSkeleton = (1e7 + "-" + 1e3 + "-" + 4e3 + "-" + 8e3 + "-" + 1e11);
    const replaceUUIDSkeletonRegex = new RegExp("[018]", "g");
    const replaceUUIDSkeletonCallback = function (charString: string): string {
        const digit = parseInt(charString.charAt(0));
        return (digit ^ ((crypto.getRandomValues(uuidRandomValues)[0] & 15)) >> (digit / 4)).toString(16);
    };
    return function randomUUID(): string {
        let uuid = "";

        if (crypto.randomUUID != null) {
            uuid = crypto.randomUUID();
        } else {
            uuid = uuidSkeleton.replace(replaceUUIDSkeletonRegex, replaceUUIDSkeletonCallback);
        }

        return uuid;
    };
}();

/** `[from, to]` range is mapped to an `interpolationFactor` in the range `[0, 1]` */
export function lerp(from: number, to: number, interpolationFactor: number): number {
    if (interpolationFactor <= 0) {
        return from;
    } else if (interpolationFactor >= 1) {
        return to;
    }

    return interpolationFactor * (to - from) + from;
}

/** `[from, to]` range is mapped to an `interpolationFactor` in the range `[0, 1]` */
export function interpolate(from: number, to: number, interpolationFactor: number, easingFunction: EasingFunction = EasingFunction.linear): number {
    const lerpFactor = easingFunction(interpolationFactor);
    return MathUtils.lerp(from, to, lerpFactor);
}

/** `[from, to]` range is mapped to an `interpolationFactor` in the range `[0, 1]`  
    `interpolationFactor` can go outside the `[0, 1]` range, periodically repeating the interpolation in the given range */
export function interpolatePeriodic(from: number, to: number, interpolationFactor: number, easingFunction: EasingFunction = EasingFunction.linear): number {
    const adjustedInterpolationFactor = WaveFunction.positiveTriangleWave(interpolationFactor);
    return MathUtils.interpolate(from, to, adjustedInterpolationFactor, easingFunction);
}

export function getEasingFunctionByName(easingFunctionName: EasingFunctionName): EasingFunction {
    let easingFunction = EasingFunction.linear;

    switch (easingFunctionName) {
        case EasingFunctionName.LINEAR:
            easingFunction = EasingFunction.linear;
            break;

        case EasingFunctionName.EASE_IN_VERY_WEAK:
            easingFunction = EasingFunction.easeInVeryWeak;
            break;
        case EasingFunctionName.EASE_IN_WEAK:
            easingFunction = EasingFunction.easeInWeak;
            break;
        case EasingFunctionName.EASE_IN:
            easingFunction = EasingFunction.easeIn;
            break;
        case EasingFunctionName.EASE_IN_STRONG:
            easingFunction = EasingFunction.easeInStrong;
            break;
        case EasingFunctionName.EASE_IN_VERY_STRONG:
            easingFunction = EasingFunction.easeInVeryStrong;
            break;

        case EasingFunctionName.EASE_OUT_VERY_WEAK:
            easingFunction = EasingFunction.easeOutVeryWeak;
            break;
        case EasingFunctionName.EASE_OUT_WEAK:
            easingFunction = EasingFunction.easeOutWeak;
            break;
        case EasingFunctionName.EASE_OUT:
            easingFunction = EasingFunction.easeOut;
            break;
        case EasingFunctionName.EASE_OUT_STRONG:
            easingFunction = EasingFunction.easeOutStrong;
            break;
        case EasingFunctionName.EASE_OUT_VERY_STRONG:
            easingFunction = EasingFunction.easeOutVeryStrong;
            break;

        case EasingFunctionName.EASE_IN_OUT_VERY_WEAK:
            easingFunction = EasingFunction.easeInOutVeryWeak;
            break;
        case EasingFunctionName.EASE_IN_OUT_WEAK:
            easingFunction = EasingFunction.easeInOutWeak;
            break;
        case EasingFunctionName.EASE_IN_OUT:
            easingFunction = EasingFunction.easeInOut;
            break;
        case EasingFunctionName.EASE_IN_OUT_STRONG:
            easingFunction = EasingFunction.easeInOutStrong;
            break;
        case EasingFunctionName.EASE_IN_OUT_VERY_STRONG:
            easingFunction = EasingFunction.easeInOutVeryStrong;
            break;
    }

    return easingFunction;
}

export function getEasingFunctionNameByIndex(index: number): EasingFunctionName | null {
    let easingFunctionName: EasingFunctionName | null = null;

    switch (index) {
        case 0:
            easingFunctionName = EasingFunctionName.LINEAR;
            break;

        case 1:
            easingFunctionName = EasingFunctionName.EASE_IN_VERY_WEAK;
            break;
        case 2:
            easingFunctionName = EasingFunctionName.EASE_IN_WEAK;
            break;
        case 3:
            easingFunctionName = EasingFunctionName.EASE_IN;
            break;
        case 4:
            easingFunctionName = EasingFunctionName.EASE_IN_STRONG;
            break;
        case 5:
            easingFunctionName = EasingFunctionName.EASE_IN_VERY_STRONG;
            break;

        case 6:
            easingFunctionName = EasingFunctionName.EASE_OUT_VERY_WEAK;
            break;
        case 7:
            easingFunctionName = EasingFunctionName.EASE_OUT_WEAK;
            break;
        case 8:
            easingFunctionName = EasingFunctionName.EASE_OUT;
            break;
        case 9:
            easingFunctionName = EasingFunctionName.EASE_OUT_STRONG;
            break;
        case 10:
            easingFunctionName = EasingFunctionName.EASE_OUT_VERY_STRONG;
            break;

        case 11:
            easingFunctionName = EasingFunctionName.EASE_IN_OUT_VERY_WEAK;
            break;
        case 12:
            easingFunctionName = EasingFunctionName.EASE_IN_OUT_WEAK;
            break;
        case 13:
            easingFunctionName = EasingFunctionName.EASE_IN_OUT;
            break;
        case 14:
            easingFunctionName = EasingFunctionName.EASE_IN_OUT_STRONG;
            break;
        case 15:
            easingFunctionName = EasingFunctionName.EASE_IN_OUT_VERY_STRONG;
            break;
    }

    return easingFunctionName;
}

export function angleDistance(from: number, to: number): number {
    return MathUtils.angleDistanceDegrees(from, to);
}

export function angleDistanceDegrees(from: number, to: number): number {
    return Math.abs(MathUtils.angleDistanceSignedDegrees(from, to));
}

export function angleDistanceRadians(from: number, to: number): number {
    return Math.abs(MathUtils.angleDistanceSignedRadians(from, to));
}

export function angleDistanceSigned(from: number, to: number): number {
    return MathUtils.angleDistanceSignedDegrees(from, to);
}

export function angleDistanceSignedDegrees(from: number, to: number): number {
    const clampedFrom = MathUtils.angleClampDegrees(from, true);
    const clampedTo = MathUtils.angleClampDegrees(to, true);

    let distance = clampedTo - clampedFrom;
    if (clampedTo - clampedFrom > 180) {
        distance = (clampedTo - clampedFrom) - 360;
    } else if (clampedTo - clampedFrom < -180) {
        distance = (clampedTo - clampedFrom) + 360;
    }

    return distance;
}

export function angleDistanceSignedRadians(from: number, to: number): number {
    return MathUtils.toRadians(MathUtils.angleDistanceSignedDegrees(MathUtils.toDegrees(from), MathUtils.toDegrees(to)));
}

/** Clamp the angle to `-180 / +180`, so that, for example, `270` will be `-90`  
    If `usePositiveRange` is `true`, the angle will be clamped to `0 / 360` */
export function angleClamp(angle: number, usePositiveRange: boolean = false): number {
    return MathUtils.angleClampDegrees(angle, usePositiveRange);
}

/** Clamp the angle to `-180 / +180`, so that, for example, `270` will be `-90`  
    If `usePositiveRange` is `true`, the angle will be clamped to `0 / 360` */
export function angleClampDegrees(angle: number, usePositiveRange: boolean = false): number {
    let clampedAngle = angle % 360;

    if (clampedAngle < 0) {
        clampedAngle += 360;
    }

    if (!usePositiveRange) {
        if (clampedAngle > 180) {
            clampedAngle -= 360;
        }
    }

    return clampedAngle;
}


/** Clamp the angle to `-PI / +PI`, so that, for example, `1.5PI` will be `-0.5PI`  
    If `usePositiveRange` is `true`, the angle will be clamped to `0 / 2PI` */
export function angleClampRadians(angle: number, usePositiveRange: boolean = false): number {
    return MathUtils.toRadians(MathUtils.angleClampDegrees(MathUtils.toDegrees(angle), usePositiveRange));
}

/** The range goes from `start` to `end` by going toward the positive direction (if `useShortestAngle` is `false`)  
    `[20, 300]` is a `280` degrees range, `[300, 20]` is an `80` degrees range,  
    `[-150, -170]` = `[210, 190]` is a `240` degrees range,  
    `[0, -10]` = `[0, 350]` is a `350` degrees range */
export function isInsideAngleRange(angle: number, start: number, end: number, useShortestAngle: boolean = false): boolean {
    return MathUtils.isInsideAngleRangeDegrees(angle, start, end, useShortestAngle);
}

export function isInsideAngleRangeDegrees(angle: number, start: number, end: number, useShortestAngle: boolean = false): boolean {
    let insideAngleRange = false;

    const anglePositive = MathUtils.angleClampDegrees(angle, true);
    let startPositive = MathUtils.angleClampDegrees(start, true);
    let endPositive = MathUtils.angleClampDegrees(end, true);

    if (useShortestAngle) {
        if (MathUtils.angleDistanceSignedDegrees(startPositive, endPositive) < 0) {
            const temp = startPositive;
            startPositive = endPositive;
            endPositive = temp;
        }
    }

    if (startPositive < endPositive) {
        insideAngleRange = anglePositive >= startPositive && anglePositive <= endPositive;
    } else {
        insideAngleRange = anglePositive >= startPositive || anglePositive <= endPositive;
    }

    return insideAngleRange;
}

export function isInsideAngleRangeRadians(angle: number, start: number, end: number, useShortestAngle: boolean = false): boolean {
    return MathUtils.isInsideAngleRangeDegrees(MathUtils.toDegrees(angle), MathUtils.toDegrees(start), MathUtils.toDegrees(end), useShortestAngle);
}

/**
 * How to use
 * 
 * By default the rotations are in `Degrees`
 * 
 * For rotations u can add a suffix like `Degrees`/`Radians` to use a specific version, example:  
 *     - `angleDistanceSignedDegrees`  
 *     - `isInsideAngleRangeRadians`
 */
export const MathUtils = {
    EPSILON,
    EPSILON_SQUARED,
    EPSILON_DEGREES,
    clamp,
    sign,
    toDegrees,
    toRadians,
    roundDecimal,
    mapToRange,
    random,
    randomInt,
    randomBool,
    randomSign,
    randomPick,
    randomUUID,
    lerp,
    interpolate,
    interpolatePeriodic,
    getEasingFunctionByName,
    getEasingFunctionNameByIndex,
    angleDistance,
    angleDistanceDegrees,
    angleDistanceRadians,
    angleDistanceSigned,
    angleDistanceSignedDegrees,
    angleDistanceSignedRadians,
    angleClamp,
    angleClampDegrees,
    angleClampRadians,
    isInsideAngleRange,
    isInsideAngleRangeDegrees,
    isInsideAngleRangeRadians,
} as const;