
export function getAverage(trips) {
    const ht = trips.length;
    return trips.reduce((accum, record) => {
        const kpl = record.trip / record.volume;
        const cpk = record.cost / record.trip;
        return {
            cost: accum.cost + (record.cost / ht),
            volume: accum.volume + (record.volume / ht),
            trip: accum.trip + (record.trip / ht),
            kpl: accum.kpl + (kpl / ht),
            cpk: accum.cpk + (cpk / ht),
            wholeTrip: accum.wholeTrip + (record.trip * 1),
        }
    }, { cost: 0, volume: 0, trip: 0, kpl: 0, cpk: 0, wholeTrip: 0 });
}