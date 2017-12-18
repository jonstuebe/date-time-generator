import React from 'react';

import Row from '../components/Row';
import Col from '../components/Col';

import Item from '../components/Item';
import Heading from '../components/Heading';

const ItemContainer = React.createClass({
    render() {
        return (
            <div>
                <Row>
                    <Col xs={12}>
                        <Heading>Presets</Heading>
                        <Item
                            preset={true}
                            language={this.props.language}
                            formats={{
                                js: 'dddd, MMMM D YYYY',
                                php: 'l, F j Y',
                                ruby: '%A, %B %e %Y',
                                python: '%A, %B %d %Y',
                            }}
                            onClick={this.props.selectItem}
                        />
                        <Item
                            preset={true}
                            language={this.props.language}
                            formats={{
                                js: 'MM/DD/YYYY',
                                php: 'm/d/Y',
                                ruby: '%m/%d/%Y',
                                python: '%m/%d/%Y',
                            }}
                            onClick={this.props.selectItem}
                        />
                        <Item
                            preset={true}
                            language={this.props.language}
                            formats={{
                                js: 'MMMM YYYY',
                                php: 'F Y',
                                ruby: '%B %Y',
                                python: '%B %Y',
                            }}
                            onClick={this.props.selectItem}
                        />
                        <Item
                            preset={true}
                            language={this.props.language}
                            formats={{
                                js: 'MMM D, YYYY',
                                php: 'M j, Y',
                                ruby: '%B %e, %Y',
                                python: '%B %d, %Y',
                            }}
                            onClick={this.props.selectItem}
                        />
                        <Item
                            preset={true}
                            live={true} language={this.props.language}
                            formats={{
                                js: 'YYYY-MM-DD HH:mm:ss',
                                php: 'Y-m-d H:i:s',
                                ruby: '%Y-%m-%d %H:%M:%S',
                                python: '%Y-%m-%d %H:%M:%S',
                            }}
                            onClick={this.props.selectItem}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <Heading>Day of Month</Heading>
                        <Row>
                            <Item
                                language={this.props.language}
                                desc='2 digits without leading zeros'
                                formats={{
                                    js: 'D',
                                    php: 'j',
                                    ruby: '%e',
                                }}
                                colWrapper={true}
                                onClick={this.props.selectItem}
                            />
                            <Item
                                language={this.props.language}
                                desc='without leading zeros with suffix'
                                formats={{
                                    js: 'Do',
                                    php: 'jS',
                                }}
                                colWrapper={true}
                                onClick={this.props.selectItem}
                            />
                            <Item
                                language={this.props.language}
                                desc='2 digits with leading zeros'
                                formats={{
                                    js: 'DD',
                                    php: 'd',
                                    ruby: '%d',
                                    python: '%d',
                                }}
                                colWrapper={true}
                                onClick={this.props.selectItem}
                            />
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <Heading>Day of Week</Heading>
                        <Row>
                            <Item
                                language={this.props.language}
                                desc='without leading zeros'
                                formats={{
                                    js: 'd',
                                    php: 'w',
                                    ruby: '%e',
                                }}
                                colWrapper={true}
                                onClick={this.props.selectItem}
                            />
                            <Item
                                language={this.props.language}
                                desc='with leading zeros with suffix'
                                formats={{
                                    js: 'do',
                                }}
                                colWrapper={true}
                                onClick={this.props.selectItem}
                            />
                            <Item
                                language={this.props.language}
                                desc='two character abbreviation'
                                formats={{
                                    js: 'dd',
                                }}
                                colWrapper={true}
                                onClick={this.props.selectItem}
                            />
                            <Item
                                language={this.props.language}
                                desc='three character abbreviation'
                                formats={{
                                    js: 'ddd',
                                    php: 'D',
                                    ruby: '%a',
                                    python: '%a'
                                }}
                                colWrapper={true}
                                onClick={this.props.selectItem}
                            />
                            <Item
                                language={this.props.language}
                                desc='full textual representation'
                                formats={{
                                    js: 'dddd',
                                    php: 'l',
                                    ruby: '%A',
                                    python: '%A'
                                }}
                                colWrapper={true}
                                onClick={this.props.selectItem}
                            />
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <Heading>Day of Year</Heading>
                        <Row>
                            <Item
                                language={this.props.language}
                                desc='without leading zeros'
                                formats={{
                                    js: 'DDD',
                                    php: 'z',
                                }}
                                colWrapper={true}
                                onClick={this.props.selectItem}
                            />
                            <Item
                                language={this.props.language}
                                desc='without leading zeros with suffix'
                                formats={{
                                    js: 'DDDo',
                                }}
                                colWrapper={true}
                                onClick={this.props.selectItem}
                            />
                            <Item
                                language={this.props.language}
                                desc='with leading zeros'
                                formats={{
                                    js: 'DDDD',
                                    ruby: '%j',
                                    python: '%j',
                                }}
                                colWrapper={true}
                                onClick={this.props.selectItem}
                            />
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <Heading>Week of Year</Heading>
                        <Row>
                            <Item
                                language={this.props.language}
                                desc='without leading zeros'
                                formats={{
                                    js: 'w',
                                }}
                                colWrapper={true}
                                onClick={this.props.selectItem}
                            />
                            <Item
                                language={this.props.language}
                                desc='without leading zeros with suffix'
                                formats={{
                                    js: 'wo',
                                }}
                                colWrapper={true}
                                onClick={this.props.selectItem}
                            />
                            <Item
                                language={this.props.language}
                                desc='with leading zeros'
                                formats={{
                                    js: 'ww',
                                    php: 'W',
                                    ruby: '%U',
                                    python: '%U',
                                }}
                                colWrapper={true}
                                onClick={this.props.selectItem}
                            />
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <Heading>Year</Heading>
                        <Row>
                            <Item
                                language={this.props.language}
                                desc='two digit'
                                formats={{
                                    js: 'YY',
                                    php: 'y',
                                    ruby: '%y',
                                    python: '%y',
                                }}
                                colWrapper={true}
                                onClick={this.props.selectItem}
                            />
                            <Item
                                language={this.props.language}
                                desc='four digit'
                                formats={{
                                    js: 'YYYY',
                                    php: 'Y',
                                    ruby: '%Y',
                                    python: '%Y',
                                }}
                                colWrapper={true}
                                onClick={this.props.selectItem}
                            />
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <Heading>Month</Heading>
                        <Row>
                            <Item
                                language={this.props.language}
                                desc='without leading zero'
                                formats={{
                                    js: 'M',
                                    php: 'n',
                                    ruby: '%e',
                                }}
                                colWrapper={true}
                                onClick={this.props.selectItem}
                            />
                            <Item
                                language={this.props.language}
                                desc='without leading zeros with suffix'
                                formats={{
                                    js: 'Mo',
                                }}
                                colWrapper={true}
                                onClick={this.props.selectItem}
                            />
                            <Item
                                language={this.props.language}
                                desc='with leading zeros'
                                formats={{
                                    js: 'MM',
                                    php: 'm',
                                    ruby: '%m',
                                    python: '%m',
                                }}
                                colWrapper={true}
                                onClick={this.props.selectItem}
                            />
                            <Item
                                language={this.props.language}
                                desc='abbreviation'
                                formats={{
                                    js: 'MMM',
                                    php: 'M',
                                    ruby: '%b',
                                    python: '%b',
                                }}
                                colWrapper={true}
                                onClick={this.props.selectItem}
                            />
                            <Item
                                language={this.props.language}
                                desc='full textual representation'
                                formats={{
                                    js: 'MMMM',
                                    php: 'F',
                                    ruby: '%B',
                                    python: '%B',
                                }}
                                colWrapper={true}
                                onClick={this.props.selectItem}
                            />
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <Heading>Time</Heading>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <Heading>Hours</Heading>
                        <Row>
                            <Item
                                language={this.props.language}
                                desc='without leading zeros (12 hour)'
                                formats={{
                                    js: 'h',
                                    php: 'g',
                                    ruby: '%l',
                                }}
                                colWrapper={true}
                                onClick={this.props.selectItem}
                            />
                            <Item
                                language={this.props.language}
                                desc='with leading zeros (12 hour)'
                                formats={{
                                    js: 'hh',
                                    php: 'h',
                                    ruby: '%I',
                                    python: '%I',
                                }}
                                colWrapper={true}
                                onClick={this.props.selectItem}
                            />
                            <Item
                                language={this.props.language}
                                desc='without leading zeros (24 hour)'
                                formats={{
                                    js: 'H',
                                    php: 'G',
                                    ruby: '%k',
                                }}
                                colWrapper={true}
                                onClick={this.props.selectItem}
                            />
                            <Item
                                language={this.props.language}
                                desc='with leading zeros (24 hour)'
                                formats={{
                                    js: 'HH',
                                    php: 'H',
                                    ruby: '%H',
                                    python: '%H',
                                }}
                                colWrapper={true}
                                onClick={this.props.selectItem}
                            />
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <Heading>Minutes</Heading>
                        <Row>
                            <Item
                                language={this.props.language}
                                desc='without leading zeros'
                                formats={{
                                    js: 'm',
                                }}
                                live={true}
                                colWrapper={true}
                                onClick={this.props.selectItem}
                            />
                            <Item
                                language={this.props.language}
                                desc='with leading zeros'
                                formats={{
                                    js: 'mm',
                                    php: 'i',
                                    ruby: '%M',
                                    python: '%M',
                                }}
                                live={true}
                                colWrapper={true}
                                onClick={this.props.selectItem}
                            />
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <Heading>Seconds</Heading>
                        <Row>
                            <Item
                                language={this.props.language}
                                desc='without leading zeros'
                                formats={{
                                    js: 's',
                                }}
                                live={true}
                                colWrapper={true}
                                onClick={this.props.selectItem}
                            />
                            <Item
                                language={this.props.language}
                                desc='with leading zeros'
                                formats={{
                                    js: 'ss',
                                    php: 's',
                                    ruby: '%S',
                                    python: '%S',
                                }}
                                live={true}
                                colWrapper={true}
                                onClick={this.props.selectItem}
                            />
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <Heading>AM/PM</Heading>
                        <Row>
                            <Item
                                language={this.props.language}
                                desc='uppercase'
                                formats={{
                                    js: 'A',
                                    php: 'A',
                                    ruby: '%p',
                                    python: '%p'
                                }}
                                colWrapper={true}
                                onClick={this.props.selectItem}
                            />
                            <Item
                                language={this.props.language}
                                desc='lowercase'
                                formats={{
                                    js: 'a',
                                    php: 'a',
                                    ruby: '%P',
                                }}
                                colWrapper={true}
                                onClick={this.props.selectItem}
                            />
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <Heading>Timezone</Heading>
                        <Row>
                            <Item
                                language={this.props.language}
                                desc='Difference to GMT in hours with colon'
                                formats={{
                                    js: 'Z',
                                    php: 'P',
                                    ruby: '%:z',
                                }}
                                colWrapper={true}
                                onClick={this.props.selectItem}
                            />
                            <Item
                                language={this.props.language}
                                desc='Difference to GMT in hours'
                                formats={{
                                    js: 'ZZ',
                                    php: 'O',
                                    ruby: '%z',
                                    python: '%z',
                                }}
                                colWrapper={true}
                                onClick={this.props.selectItem}
                            />
                        </Row>
                    </Col>
                </Row>
            </div>
        );
    }
});

export default ItemContainer;
