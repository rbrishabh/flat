import { autoPersistStore } from "./utils";
import { LoginProcessResult } from "../apiMiddleware/flatServer";

// clear storage if not match
const LS_VERSION = 1;

export type UserInfo = LoginProcessResult;

/**
 * Properties in Global Store are persisted and shared globally.
 */
export class GlobalStore {
    /**
     * Show tooltips for classroom record hints.
     * Hide it permanently if user close the tooltip.
     */
    public checkNewVersionDate: number = new Date().getTime();
    public isShowRecordHintTips = true;
    public userInfo: UserInfo | null = null;
    public whiteboardRoomUUID: string | null = null;
    public whiteboardRoomToken: string | null = null;
    public rtcToken: string | null = null;
    public rtcUID: number | null = null;
    public rtmToken: string | null = null;

    public get userUUID(): string | undefined {
        return this.userInfo?.userUUID;
    }

    public get userName(): string | undefined {
        return this.userInfo?.name;
    }

    public constructor() {
        autoPersistStore({ storeLSName: "GlobalStore", store: this, version: LS_VERSION });
    }

    public updateUserInfo = (userInfo: UserInfo): void => {
        this.userInfo = userInfo;
    };

    public updateToken = (
        config: Partial<
            Pick<
                GlobalStore,
                "whiteboardRoomUUID" | "whiteboardRoomToken" | "rtcToken" | "rtmToken" | "rtcUID"
            >
        >,
    ): void => {
        const keys = [
            "whiteboardRoomUUID",
            "whiteboardRoomToken",
            "rtcToken",
            "rtmToken",
            "rtcUID",
        ] as const;
        for (const key of keys) {
            const value = config[key];
            if (value !== null && value !== undefined) {
                this[key] = value as any;
            }
        }
    };

    public updateCheckNewVersionDate = (): void => {
        this.checkNewVersionDate = new Date().getTime();
    };

    public hideRecordHintTips = (): void => {
        this.isShowRecordHintTips = false;
    };
}

export const globalStore = new GlobalStore();
