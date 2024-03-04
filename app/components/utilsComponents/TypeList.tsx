'use client';

interface Props{
    list: string[],
    className: string,
    setList: (newList: string[], i: string) => void
}

export default function TypeList( { list, className, setList }: Props) {
    return (
        <div className={`flex gap-4 flex-wrap ${className}`}> 
            {list.map((item) => 
                <div
                    className="w-fit center relative inline-block select-none whitespace-nowrap rounded-lg bg-gradient-to-tr from-pink-600 to-pink-400 py-2 px-3.5 align-baseline font-sans text-xs font-bold uppercase leading-none text-white"
                    data-dismissible="chip"
                    key={item}
                    >
                    <div className="mr-5 mt-px">{item}</div>
                    <div
                        className="absolute top-1 right-1 mx-px mt-[0.5px] w-max rounded-md bg-pink-800 transition-colors hover:bg-pink-900"
                        data-dismissible-target="chip"
                    >
                        <div role="button" onClick={() => setList(list.filter((i) => i !== item), item)} className="h-5 w-5 p-1">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            stroke-width="3"
                        >
                            <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                            ></path>
                        </svg>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
  }
  