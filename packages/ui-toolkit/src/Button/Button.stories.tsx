import React from 'react';
import Button from "./Button";

export default {
    title: "components/button",
    component: Button
}

export const primaryButton = () => <Button theme="primary">Button</Button>;

export const secondaryButton = () => <Button theme="secondary">Button</Button>;