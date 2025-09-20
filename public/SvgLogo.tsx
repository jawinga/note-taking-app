import * as React from "react";

const SvgLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 400 400"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#logo_svg__clip0_1_2)">
      <circle cx={200} cy={200} r={200} fill="#4F46E5" />
      <path
        d="M200 70c-72.2 0-130.8 58.6-130.8 130.8 0 72.2 58.6 130.8 130.8 130.8 72.2 0 130.8-58.6 130.8-130.8 0-72.2-58.6-130.8-130.8-130.8z"
        fill="url(#logo_svg__paint0_linear_1_2)"
      />
      <path
        d="M200 90c-61.3 0-111 49.7-111 111s49.7 111 111 111 111-49.7 111-111-49.7-111-111-111z"
        fill="#C7D2FE"
      />
      <path
        d="M200 110c-50.4 0-91.3 40.9-91.3 91.3S149.6 292.5 200 292.5 291.3 251.6 291.3 201.2 250.4 110 200 110z"
        fill="url(#logo_svg__paint1_linear_1_2)"
      />
      <circle cx={200} cy={200} r={70} fill="#4F46E5" />
      <path
        d="M200 130c-38.8 0-70 31.2-70 70s31.2 70 70 70 70-31.2 70-70-31.2-70-70-70z"
        fill="url(#logo_svg__paint2_linear_1_2)"
      />
      <path
        d="M200 150c-27.6 0-50 22.4-50 50s22.4 50 50 50 50-22.4 50-50-22.4-50-50-50z"
        fill="#C7D2FE"
      />
      <circle cx={200} cy={200} r={30} fill="#4F46E5" />
      <path
        d="M200 170c-16.6 0-30 13.4-30 30s13.4 30 30 30 30-13.4 30-30-13.4-30-30-30z"
        fill="url(#logo_svg__paint3_linear_1_2)"
      />
    </g>
    <defs>
      <linearGradient
        id="logo_svg__paint0_linear_1_2"
        x1={69.2}
        y1={200}
        x2={330.8}
        y2={200}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#6366F1" />
        <stop offset={1} stopColor="#4338CA" stopOpacity={0} />
      </linearGradient>
      <linearGradient
        id="logo_svg__paint1_linear_1_2"
        x1={109}
        y1={201.2}
        x2={291}
        y2={201.2}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#818CF8" />
        <stop offset={1} stopColor="#4338CA" stopOpacity={0} />
      </linearGradient>
      <linearGradient
        id="logo_svg__paint2_linear_1_2"
        x1={130}
        y1={200}
        x2={270}
        y2={200}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#6366F1" />
        <stop offset={1} stopColor="#4338CA" stopOpacity={0} />
      </linearGradient>
      <linearGradient
        id="logo_svg__paint3_linear_1_2"
        x1={170}
        y1={200}
        x2={230}
        y2={200}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#6366F1" />
        <stop offset={1} stopColor="#4338CA" stopOpacity={0} />
      </linearGradient>
      <clipPath id="logo_svg__clip0_1_2">
        <rect width={400} height={400} fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default SvgLogo;
