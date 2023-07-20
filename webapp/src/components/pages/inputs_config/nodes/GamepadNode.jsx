// SPDX-FileCopyrightText: © 2023 OneEyeFPV oneeyefpv@gmail.com
// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-License-Identifier: FS-0.9-or-later

import React, {useCallback, useState} from 'react';

import {SvgIcon} from "@mui/material";
import {GamepadViewer} from "../../gamepads/GamepadViewer";
import {TopOutput} from "../handles/TopOutput";

import {GenericInputNode} from "./GenericInputNode";
import {showError} from "../../../misc/notifications";
import {getGamepads} from "../../../misc/server";


import {getNodeData} from "../misc/node-access";
import i18n from "../../../misc/I18n";

function GamepadNode(node) {

    const [gamepadViewerOpen, setGamepadViewerOpen] = useState(false);
    const [gamepad, setGamepad] = useState(false);

    const onInspectOpen = useCallback(() => {
        let inputDeviceId = getNodeData(node)?.id;
        if (!inputDeviceId) {
            showError(`${i18n("error-msg-no-gamepad")}`);
            return
        }

        (async () => {
            try {
                let gamepadsList = await getGamepads();
                let gamepadsById = new Map(gamepadsList.map((gamepad) => [gamepad.getId(), gamepad]));

                if (!gamepadsById.has(inputDeviceId)) {
                    showError(`${i18n("error-msg-no-input")}`);
                    return
                }
                setGamepad(gamepadsById.get(inputDeviceId));
                setGamepadViewerOpen(true);
            } catch (e) {
                showError(`${i18n("error-msg-gamepads-not-loaded")}`);
            }
        })()

    }, [node]);

    const handleViewerClose = useCallback(() => {
        setGamepadViewerOpen(false);
    }, []);

    return (<GenericInputNode
            node={node}
            onInspectOpen={onInspectOpen}
            iconProps={{
                style: {marginBottom: "-12px"}
            }}
            labelProps={{
                style: {marginTop: "4px", marginBottom: "-6px"}
            }}
        >

            <TopOutput node={node}/>

            {gamepadViewerOpen ?
                <GamepadViewer gamepad={gamepad} open={gamepadViewerOpen} onClose={handleViewerClose}/> : ""}
        </GenericInputNode>

    );
}

GamepadNode.type = "gamepad";
GamepadNode.menuIcon = <SvgIcon>
    <path fill="#656565"
          d="M9.807 5.508a2.576 2.576 0 0 0-1.639-.206l-1.182.226a2.852 2.852 0 0 0-2.004 1.5c-1.367 2.672-2.4 4.862-2.8 6.729c-.41 1.926-.16 3.575 1.08 5.076c.821.996 2.23.794 2.963-.036c.56-.632 1.195-1.364 1.818-2.086a2.153 2.153 0 0 1 1.63-.749h4.655c.625 0 1.22.274 1.63.749a219.57 219.57 0 0 0 1.817 2.086c.734.83 2.142 1.032 2.964.036c1.239-1.501 1.49-3.15 1.079-5.076c-.399-1.867-1.433-4.057-2.8-6.73a2.852 2.852 0 0 0-2.003-1.5l-1.183-.225a2.576 2.576 0 0 0-1.639.206c-.143.071-.29.149-.439.23a2.344 2.344 0 0 1-1.113.296h-1.282c-.376 0-.757-.104-1.113-.297a15.07 15.07 0 0 0-.44-.23ZM12 11a1 1 0 1 1 0-2a1 1 0 0 1 0 2Z"/>
</SvgIcon>;


export default GamepadNode;
