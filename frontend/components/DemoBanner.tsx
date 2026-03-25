
const DemoBanner = ({ show }: { show: boolean }) => {
    const sourceUrl = "https://github.com/Janiizzi/skimuerren";

    if (!show) {
        return null;
    }

    return (
        <div className="w-full bg-amber-400 text-amber-950 text-center text-xs md:text-sm px-4 py-2 font-medium tracking-wide z-50">
            ⛷️ &nbsp;<strong>Demo-Version</strong>&nbsp;—&nbsp;
            All data is example data. Changes are not saved.
            {sourceUrl && (
                <>
                    &nbsp;
                    <a
                        href={sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-amber-900"
                    >
                        Source Code →
                    </a>
                </>
            )}
        </div>
    );
};

export default DemoBanner;