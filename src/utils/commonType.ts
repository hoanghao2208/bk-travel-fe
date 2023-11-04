// import { InputRef } from 'antd';
import { ReactComponentElement } from 'react';

export type CommonElementType = ReactComponentElement<any, any> | null;

// export interface CommonRefType extends HTMLElement, InputRef {
//     focus: () => void;
// }

// export interface CommonDocumentElement extends HTMLElement {
//     webkitRequestFullscreen?: () => void; // Safari
//     msRequestFullscreen?: () => void; // IE11
// }

// export interface CommonDocument extends Document {
//     webkitExitFullscreen?: () => void; // Safari
//     msExitFullscreen?: () => void; // IE11
// }

// Remove 'optional' attributes from a type's properties
// export type Concrete<Type> = {
//     [Property in keyof Type]-?: Type[Property];
// };

// Add 'optional' attributes from a type's properties
export type Optional<Type> = {
    [Property in keyof Type]+?: Type[Property];
};

// export type PartialOptional<Type, ExcludeList extends keyof Type> = {
//     // only add optional to properties that are not in the ExcludeList
//     [Property in keyof Type as Exclude<
//         Property,
//         ExcludeList
//     >]+?: Type[Property];
// } & {
//     // properties in the ExcludeList will be required
//     [Property in ExcludeList]-?: Type[Property];
// };
