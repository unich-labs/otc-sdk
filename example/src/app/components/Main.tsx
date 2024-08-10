"use client";
import { Tabs } from "flowbite-react";
import CreateOrder from "./CreateOrder";
import FillOffer from "./FillOffer";
import SettleOrder from "./SettleOrder";

export default function Main() {
    return (
        <Tabs aria-label="Default tabs" style="default">
            <Tabs.Item title="Create offer">
                <CreateOrder />
            </Tabs.Item>
            {/* <Tabs.Item title="Fill offer">
                <FillOffer />
            </Tabs.Item>
            <Tabs.Item title="Settle order">
                <SettleOrder />
            </Tabs.Item> */}
        </Tabs>
    );
}
