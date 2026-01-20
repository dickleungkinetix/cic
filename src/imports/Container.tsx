function Icon2Vector({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="absolute inset-1/4">
      <div className="absolute inset-[-8.33%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
          {children}
        </svg>
      </div>
    </div>
  );
}
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
    <div className="h-[30px] relative shrink-0 w-[464.531px]" data-name="Heading 2">
      <p className="absolute font-['Arial:Bold',sans-serif] leading-[30px] left-0 not-italic text-[#101828] text-[20px] text-nowrap top-0">Edit User Access</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[24px] relative shrink-0 w-[464.531px]" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#6a7282] text-[16px] top-0 w-[186px]">User1 - User1@cic.gov.hk</p>
    </div>
  );
}

function Text() {
  return (
    <div className="absolute content-stretch flex h-[18px] items-start left-0 top-[4px] w-[35.641px]" data-name="Text">
      <p className="basis-0 font-['Arial:Regular',sans-serif] grow leading-[21px] min-h-px min-w-px not-italic relative shrink-0 text-[#6a7282] text-[14px]">Role:</p>
    </div>
  );
}

function Text1() {
  return (
    <div className="absolute content-stretch flex h-[16px] items-start left-[35.64px] top-[5px] w-[82.469px]" data-name="Text">
      <p className="font-['Arial:Regular',sans-serif] leading-[21px] not-italic relative shrink-0 text-[#c10007] text-[14px] text-nowrap">Administrator</p>
    </div>
  );
}

function Container() {
  return (
    <div className="h-[24px] relative shrink-0 w-[464.531px]" data-name="Container">
      <Text />
      <Text1 />
    </div>
  );
}

function Container1() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[4px] grow h-[90px] items-start min-h-px min-w-px relative shrink-0" data-name="Container">
      <Heading />
      <Paragraph />
      <Container />
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
    <div className="content-stretch flex gap-[10px] items-start relative shrink-0">
      <Button />
      <Button1 />
    </div>
  );
}

function Frame() {
  return (
    <div className="relative shrink-0 w-[600px]">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[10px] items-end relative w-full">
        <Container1 />
        <Frame1 />
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="h-[24px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <Icon2Vector>
        <path d="M13 1L1 13" id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </Icon2Vector>
      <Icon2Vector>
        <path d="M1 1L13 13" id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </Icon2Vector>
    </div>
  );
}

function Button2() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Icon />
      </div>
    </div>
  );
}

export default function Container2() {
  return (
    <div className="relative size-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pb-px pt-0 px-[24px] relative size-full">
          <Frame />
          <Button2 />
        </div>
      </div>
    </div>
  );
}