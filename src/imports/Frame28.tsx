import svgPaths from "./svg-3v5zv7z7cz";
import { imgGroup } from "./svg-zc35l";
type TextTextProps = {
  text: string;
};

function TextText({ text }: TextTextProps) {
  return (
    <div className="relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative">
        <p className="font-['Arial:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[16px] text-center text-nowrap text-white">{text}</p>
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Heading 3">
      <p className="font-['Arial:Bold',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#4a5565] text-[16px] text-nowrap">Course Access Permissions</p>
    </div>
  );
}

function Frame() {
  return (
    <div className="basis-0 content-stretch flex grow items-center min-h-px min-w-px relative shrink-0">
      <p className="font-['Arial:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#4a5565] text-[14px] text-nowrap">Assign access permissions for each program. Users can have admin access, vetting access, or both.</p>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#7eb439] content-stretch flex gap-[8px] h-[40px] items-center px-[16px] py-0 relative rounded-[10px] shrink-0" data-name="Button">
      <TextText text="Bulk Check Admin" />
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#7eb439] content-stretch flex gap-[8px] h-[40px] items-center px-[16px] py-0 relative rounded-[10px] shrink-0" data-name="Button">
      <TextText text="Bulk Check Vetting" />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0">
      <Button />
      <Button1 />
    </div>
  );
}

function Group() {
  return (
    <div className="[grid-area:1_/_1] h-[17px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-9.333px_-12px] mask-size-[40px_40px] ml-[23.33%] mt-[30%] relative w-[19.125px]" data-name="Group" style={{ maskImage: `url('${imgGroup}')` }}>
      <div className="absolute inset-[-10.42%_-9.26%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23 21">
          <g id="Group">
            <path d={svgPaths.p84c0080} id="Vector" stroke="var(--stroke-0, #D6DAE0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.54169" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function ClipPathGroup() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Clip path group">
      <Group />
    </div>
  );
}

function SortingRightSvgrepoCom() {
  return (
    <div className="content-stretch flex items-center overflow-clip relative shrink-0" data-name="sorting-right_svgrepo.com">
      <ClipPathGroup />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0 w-full" data-name="Paragraph">
      <Frame />
      <Frame1 />
      <SortingRightSvgrepoCom />
    </div>
  );
}

export default function Frame2() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative size-full">
      <Heading />
      <Paragraph />
    </div>
  );
}