
export function getAverage(trips) {
    const ht = trips.length;
    return trips.reduce((accum, record) => {
        const kpl = record.trip / record.litters;
        const cpk = record.cost / record.trip;
        return {
            cost: accum.cost + (record.cost / ht),
            litters: accum.litters + (record.litters / ht),
            trip: accum.trip + (record.trip / ht),
            kpl: accum.kpl + (kpl / ht),
            cpk: accum.cpk + (cpk / ht),
            wholeTrip: accum.wholeTrip + (record.trip * 1),
        }
    }, { cost: 0, litters: 0, trip: 0, kpl: 0, cpk: 0, wholeTrip: 0 });
}