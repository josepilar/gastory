import React, { memo } from 'react';
import { Statistic, Card, Row, Col, Icon, Empty, Tag} from 'antd';

const Home = ({ history }) => {
    if (!history) return null;
    if (!history.length) return <Empty style={{paddingTop: 100}}/>;
    const ht = history.length;
    const average = history.reduce((accum, record) => {
        const kpl = record.trip/record.litters;
        const cpk = record.cost/record.trip;
        return {
            cost: accum.cost + (record.cost/ht),
            litters: accum.litters + (record.litters/ht),
            trip: accum.trip + (record.trip/ht),
            kpl: accum.kpl + (kpl/ht),
            cpk: accum.cpk + (cpk/ht),
            wholeTrip: accum.wholeTrip + (record.trip * 1),
        }
    }, { cost: 0, litters: 0, trip: 0, kpl: 0, cpk: 0, wholeTrip: 0});
    const lastRecord = {...history[ht -1]};
    lastRecord.kpl = lastRecord.trip/lastRecord.litters;
    lastRecord.cpk = lastRecord.cost/lastRecord.trip;
    average.wholeTrip = (average.wholeTrip/1000).toString().substring(0, 5);

    console.log(average.wholeTrip);

    return (
        <div style={{ padding: '20px' }}>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={{ marginLeft: 0, marginRight: 0 }}>
                    <Card>
                        <Col span={12} >
                            <Statistic 
                                title="Viaje hasta ahora" 
                                value={`${average.wholeTrip}K`}
                                prefix={<Icon type="car" />}
                                suffix={<Tag color="#87d068">Kms</Tag>}
                                precision={2}/>
                        </Col>
                        <Col span={12}>
                            <Statistic 
                                title="Consumo" 
                                value={lastRecord.kpl}
                                valueStyle={{ color: lastRecord.kpl > average.kpl ? '#3f8600' : '#cf1322' }}
                                prefix={<Icon type={lastRecord.kpl > average.kpl ? 'arrow-up' : 'arrow-down'} />}
                                suffix={<Tag color="#87d068">Km/L</Tag>}
                                precision={2}/>
                        </Col>
                    </Card>
            </Row>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col span={12} style={{ padding: 4}}>
                    <Card>
                        <Statistic 
                            title="Consumo" 
                            value={lastRecord.kpl}
                            valueStyle={{ color: lastRecord.kpl > average.kpl ? '#3f8600' : '#cf1322' }}
                            prefix={<Icon type={lastRecord.kpl > average.kpl ? 'arrow-up' : 'arrow-down'} />}
                            suffix={<Tag color="#87d068">Km/L</Tag>}
                            precision={2}/>
                    </Card>
                </Col>
                <Col span={12} style={{ padding: 4}}>
                    <Card>
                        <Statistic 
                            title="Costo por Km" 
                            value={lastRecord.cpk}
                            valueStyle={{ color: lastRecord.cpk < average.cpk ? '#3f8600' : '#cf1322' }}
                            prefix={<Icon type={lastRecord.cpk > average.cpk ? 'arrow-up' : 'arrow-down'} />}
                            suffix={<Tag color="#87d068">$/Km</Tag>}
                            precision={2}/>
                    </Card>
                </Col>
            </Row>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col span={12} style={{ padding: 4}}>
                    <Card>
                        <Statistic 
                            title="Ultimo Gasto" 
                            value={lastRecord.cost}
                            valueStyle={{ color: lastRecord.cost < average.cost ? '#3f8600' : '#cf1322' }}
                            prefix={<Icon type={lastRecord.cost >  average.cost ? 'arrow-up' : 'arrow-down'} />}
                            suffix={<Tag color="#87d068">Mxn</Tag>}
                            precision={2}/>
                    </Card>
                </Col>
                <Col span={12} style={{ padding: 4}}>
                    <Card>
                        <Statistic 
                            title="Ultimo Viaje" 
                            value={lastRecord.trip}
                            valueStyle={{ color: lastRecord.trip > average.trip ? '#3f8600' : '#cf1322' }}
                            prefix={<Icon type={lastRecord.trip >  average.trip ? 'arrow-up' : 'arrow-down'} />}
                            suffix={<Tag color="#87d068">Kms</Tag>}
                            precision={2}/>
                    </Card>
                </Col>
            </Row>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col span={24} style={{ padding: 4}}>
                    <Card>
                        <Statistic 
                            title="Promedio de Recarga" 
                            value={lastRecord.litters}
                            valueStyle={{ color: lastRecord.litters < average.litters ? '#3f8600' : '#cf1322' }}
                            prefix={<Icon type={lastRecord.litters >  average.litters ? 'arrow-up' : 'arrow-down'} />}
                            suffix={<Tag color="#87d068">Lts</Tag>}
                            precision={2}/>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};


export default memo(Home);