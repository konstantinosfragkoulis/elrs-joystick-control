// SPDX-FileCopyrightText: © 2023 OneEyeFPV oneeyefpv@gmail.com
// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-License-Identifier: FS-0.9-or-later

import React from 'react';

import {GenericTelemetryNode} from "./GenericTelemetryNode";
import RSSIPercentTelemetryIcon from "../../../icons/RSSIPercentTelemetryIcon";
import {LinkRXData} from "../../../../pbwrap";


function LinkRXUplinkRSSINode(node) {
    return (<GenericTelemetryNode
        valueProps={{
            isValidTelemetryData: data => data instanceof LinkRXData,
            getTelemetryValue: data => data.getUplinkRssi()
        }}
        node={node}/>);

}

LinkRXUplinkRSSINode.type = "link_rx_ul_rssi";
LinkRXUplinkRSSINode.menuIcon = <RSSIPercentTelemetryIcon/>;


export default LinkRXUplinkRSSINode;
