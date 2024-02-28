// Props
type propsType = {
  searchDomain: string;
};

function ResultCard({ searchDomain }: propsType) {
  if (searchDomain) {
    return (
      <div className="w-full border border-neutral-600 rounded-lg px-3 flex flex-col items-start">
        <p className="text-2xl">
          {searchDomain} <span>.dev-in.tw</span>
        </p>
      </div>
    );
  } else {
    return (
      <div className="w-full border border-neutral-600 rounded-lg px-3 flex flex-col items-start">
        <p className="text-2xl">請輸入子網域</p>
      </div>
    );
  }
}

export default ResultCard;
