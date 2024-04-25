"use client";
import { Tabs } from "flowbite-react";
import CreateOtcToken from "./CreateOtcToken";
import CreateOffer from "./CreateOffer";
import FillOffer from "./FillOffer";
import SettleOrder from "./SettleOrder";

export default function Main() {
    return (
        <Tabs aria-label="Default tabs" style="default">
            <Tabs.Item active title="Create OTC token">
                <CreateOtcToken />
            </Tabs.Item>
            <Tabs.Item title="Create offer">
                <CreateOffer />
            </Tabs.Item>
            <Tabs.Item title="Fill offer">
                <FillOffer />
            </Tabs.Item>
            <Tabs.Item title="Settle order">
                <SettleOrder />
            </Tabs.Item>
        </Tabs>
    );
}
