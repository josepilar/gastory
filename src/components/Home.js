import React, { memo, useState, useEffect } from 'react';
import { Statistic, Card, Row, Col, Icon, Empty, Tag, Divider, Spin, Button, message } from 'antd';
import { getAverage } from '../helpers/home.helper';

import { getTrips } from '../services/gastory.service';

const loadingStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center',
    width: '100%',
    height: '100%',
}
const cardStyles = {
    height: 145
}
const Home = ({ cars }) => {
    const [selectedCar, setSelectedCar] = useState();
    const [carWithTrips, setCarsWithTrips] = useState(cars);
    const [tripsLoading, setTripsLoading] = useState(false);
    useEffect(() => {
        setTripsLoading(true);
        const loadTrips = async () => {
            try {
                const trips = await getTrips();
                const carsAndTrips = cars.map(car => { return { ...car, trips: trips.filter(trip => trip.carId === car._id) } });
                setCarsWithTrips(carsAndTrips);
                setSelectedCar(carsAndTrips.find(car => car.default) || cars[0]);
                setTripsLoading(false);
            } catch (error) {
                message.error('Error loading cars');
                console.error(error);
                setTripsLoading(false);
            }
        }
        if (cars) loadTrips();
    }, [cars]);

    if (tripsLoading) { return <div style={loadingStyles}> <Spin size="large" style={{ paddingTop: 150 }} /></div>; }
    if (!carWithTrips || !carWithTrips.length) {
        return <Empty description="No Cars Found" image={<Icon type="car" style={{ fontSize: '5em' }} />} style={{ paddingTop: 100 }} >
            <Button type="primary">Add one now</Button>
        </Empty>
    }

    if (selectedCar && (!selectedCar.trips || !selectedCar.trips.length)) {
        return <Empty description="No Trips Found" image={<Icon type="dashboard" style={{ fontSize: '5em' }} />} style={{ paddingTop: 100 }} >
            <Button type="primary">Add one now</Button>
        </Empty>
    }

    const tlength = selectedCar.trips.length;
    const average = getAverage(selectedCar.trips);
    const lastRecord = { ...selectedCar.trips[tlength - 1] };
    console.log(lastRecord);

    lastRecord.kpl = (lastRecord.trip / lastRecord.volume) || 'N/A';
    lastRecord.cpk = (lastRecord.cost / lastRecord.trip) || 'N/A';
    average.wholeTrip = (average.wholeTrip / 1000).toString().substring(0, 5);
    return (
        <div style={{ padding: '20px' }}>
            <Row gutter={4} >
                <Col xs={0} sm={24} style={{ padding: 4 }}>
                    <Card bodyStyle={cardStyles}>
                        <Col style={{ height: '100%' }} xs={0} sm={12}>
                            <img style={{ maxHeight: '100%', maxWidth: '100%' }} alt={`${selectedCar.maker} ${selectedCar.model}`} src={selectedCar.imageUrl} />
                        </Col>
                        <Col xs={0} sm={12}>
                            <Statistic
                                title="Rendimiento"
                                value={lastRecord.kpl}
                                valueStyle={{ color: lastRecord.kpl > average.kpl ? '#3f8600' : '#cf1322' }}
                                prefix={<Icon type={lastRecord.kpl > average.kpl ? 'arrow-up' : 'arrow-down'} />}
                                suffix={<Tag color="#87d068">Km/L</Tag>}
                                precision={2} />
                        </Col>
                    </Card>
                </Col>
                <Col style={{ height: '100%', padding: 4 }} xs={24} sm={0} >
                    <Card bodyStyle={cardStyles}>
                        <img style={{ maxHeight: '100%', maxWidth: '100%' }} alt={`${selectedCar.maker} ${selectedCar.model}`} src={selectedCar.imageUrl} />
                    </Card>
                </Col>
                <Col xs={24} sm={0} style={{ padding: 4 }} >
                    <Card bodyStyle={cardStyles}>
                        <Statistic
                            title="Rendimiento"
                            value={lastRecord.kpl}
                            valueStyle={{ color: lastRecord.kpl > average.kpl ? '#3f8600' : '#cf1322' }}
                            prefix={<Icon type={lastRecord.kpl > average.kpl ? 'arrow-up' : 'arrow-down'} />}
                            suffix={<Tag color="#87d068">Km/L</Tag>}
                            precision={2} />
                    </Card>
                </Col>
            </Row>
            <Row gutter={4}>
                <Col xs={24} sm={12} style={{ padding: 4 }}>
                    <Card bodyStyle={cardStyles}>
                        <Statistic
                            title="Viaje hasta ahora"
                            value={`${average.wholeTrip}K`}
                            prefix={<Icon type="car" />}
                            suffix={<Tag color="#87d068">Kms</Tag>}
                            precision={2} />
                    </Card>
                </Col>
                <Col xs={24} sm={12} style={{ padding: 4 }}>
                    <Card bodyStyle={cardStyles}>
                        <Statistic
                            title="Costo por Km"
                            value={lastRecord.cpk}
                            valueStyle={{ color: lastRecord.cpk < average.cpk ? '#3f8600' : '#cf1322' }}
                            prefix={<Icon type={lastRecord.cpk > average.cpk ? 'arrow-up' : 'arrow-down'} />}
                            suffix={<Tag color="#87d068">$/Km</Tag>}
                            precision={4} />
                    </Card>
                </Col>
            </Row>
            <Row gutter={4}>
                <Col xs={24} sm={12} style={{ padding: 4 }} >
                    <Card bodyStyle={cardStyles}>
                        <Statistic
                            title="Ultimo Gasto"
                            value={lastRecord.cost}
                            valueStyle={{ color: lastRecord.cost < average.cost ? '#3f8600' : '#cf1322' }}
                            prefix={<Icon type={lastRecord.cost > average.cost ? 'arrow-up' : 'arrow-down'} />}
                            suffix={<Tag color="#87d068">Mxn</Tag>}
                            precision={2} />
                    </Card>
                </Col>
                <Col xs={24} sm={12} style={{ padding: 4 }}>
                    <Card bodyStyle={cardStyles}>
                        <Statistic
                            title="Ultimo Viaje"
                            value={lastRecord.trip}
                            valueStyle={{ color: lastRecord.trip > average.trip ? '#3f8600' : '#cf1322' }}
                            prefix={<Icon type={lastRecord.trip > average.trip ? 'arrow-up' : 'arrow-down'} />}
                            suffix={<Tag color="#87d068">Kms</Tag>}
                            precision={2} />
                    </Card>
                </Col>
            </Row>
            <Row gutter={4}>
                <Col xs={24} style={{ padding: 4 }}>
                    <Card bodyStyle={cardStyles}>
                        <Statistic
                            title="Promedio de Recarga"
                            value={lastRecord.volume}
                            valueStyle={{ color: lastRecord.volume < average.volume ? '#3f8600' : '#cf1322' }}
                            prefix={<Icon type={lastRecord.volume > average.volume ? 'arrow-up' : 'arrow-down'} />}
                            suffix={<Tag color="#87d068">Lts</Tag>}
                            precision={2} />
                    </Card>
                </Col>
            </Row>
            <Button style={{ position: 'fixed', bottom: 5, right: 5, height: '3.3em', width: '3.3em' }} type="primary" shape="circle" icon="plus" size="large" />
        </div>
    );
};


export default memo(Home);