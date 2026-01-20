function Icon() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M3.33333 8H12.6667" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 3.33333V12.6667" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text() {
  return (
    <div className="basis-0 grow h-[24px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[24px] left-[35px] not-italic text-[16px] text-center text-nowrap text-white top-[-1px] translate-x-[-50%]">Course</p>
      </div>
    </div>
  );
}

export default function Button() {
  return (
    <div className="bg-[#7eb439] relative rounded-[10px] size-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[16px] py-0 relative size-full">
          <Icon />
          <Text />
        </div>
      </div>
    </div>
  );
}