import { defaultRangeSplitter as splitter } from "../../shared/defaults/defaults";

const buildRangesObject = (ranges: Object) => {
    const obj = {}
    for(const [key, value] of Object.entries(ranges)){
        const splittedRanges = value.split(splitter)
        obj[key] = [Number(splittedRanges[0]), Number(splittedRanges[1])]
    }

    return obj
}

export default buildRangesObject