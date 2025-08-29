import {useRouter} from "next/navigation";

export const updateSearchParams = (
    key: string,
    value: string | null,
    router: ReturnType<typeof useRouter>
) => {
    const params = new URLSearchParams(window.location.search);

    if (value === null || value === "") {
        params.delete(key);
    } else {
        params.set(key, value);
    }
    params.set("pg", "1");

    router.push(`/movies?${params.toString()}`);
};
