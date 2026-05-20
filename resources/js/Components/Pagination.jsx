import { Link } from '@inertiajs/react';

export default function Pagination({ links }) {
    if (!links || links.length <= 3) return null;

    return (
        <div className="flex flex-wrap -mb-1 mt-6 justify-center">
            {links.map((link, key) => (
                link.url === null ? (
                    <div
                        key={key}
                        className="mr-1 mb-1 px-4 py-3 text-sm leading-4 text-slate-400 border border-slate-200 rounded-lg cursor-not-allowed bg-slate-50 font-mikhak-medium"
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                ) : (
                    <Link
                        key={key}
                        href={link.url}
                        className={`mr-1 mb-1 px-4 py-3 text-sm leading-4 border rounded-lg hover:bg-slate-100 hover:text-indigo-600 focus:border-indigo-500 focus:text-indigo-500 transition-colors font-mikhak-medium ${
                            link.active 
                                ? 'bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700 hover:text-white' 
                                : 'bg-white text-slate-700 border-slate-200'
                        }`}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                )
            ))}
        </div>
    );
}
