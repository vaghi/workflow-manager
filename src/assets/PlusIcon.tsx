import React from 'react';

export const PlusIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
    return (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <g clipPath="url(#clip0_1_32832)">
                <path d="M10 5.71429H5.71429V10H4.28571V5.71429H0V4.28571H4.28571V0H5.71429V4.28571H10V5.71429Z" fill="currentColor" />
            </g>
            <defs>
                <clipPath id="clip0_1_32832">
                    <rect width="10" height="10" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
};
