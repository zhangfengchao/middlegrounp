import { Drawer, Modal, Table, Row, Col, Form, Input, Button, Space, Select } from 'antd';
import React, { useState } from 'react';
import type { ColumnsType } from 'antd/lib/table';
import { MenuOutlined, PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { arrayMoveImmutable } from 'array-move';
import type { SortableContainerProps, SortEnd } from 'react-sortable-hoc';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';

const { Option } = Select;

interface HomeModals {
    isModalVisible: boolean
    onClose: Function
}


interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    index: number;
}

const DragHandle = SortableHandle(() => <MenuOutlined style={{ cursor: 'grab', color: '#999' }} />);

const columns: ColumnsType<DataType> = [
    {
        title: 'Sort',
        dataIndex: 'sort',
        width: 30,
        className: 'drag-visible',
        render: () => <DragHandle />,
    },
    {
        title: 'Name',
        dataIndex: 'name',
        className: 'drag-visible',
    },
    {
        title: 'Age',
        dataIndex: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
    },
];

const data: DataType[] = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        index: 0,
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        index: 1,
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        index: 2,
    },
];

const SortableItem = SortableElement((props: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr {...props} />
));
const SortableBody = SortableContainer((props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <tbody {...props} />
));

const sights = {
    Beijing: ['Tiananmen', 'Great Wall'],
    Shanghai: ['Oriental Pearl', 'The Bund'],
};

type SightsKeys = keyof typeof sights;


const HomeModal: React.FC<HomeModals> = (props) => {
    const [dataSource, setDataSource] = useState(data);
    const [rightVisible, setrightVisible] = useState(false)
    const [form] = Form.useForm();
    const onSortEnd = ({ oldIndex, newIndex }: SortEnd) => {
        if (oldIndex !== newIndex) {
            const newData = arrayMoveImmutable(dataSource.slice(), oldIndex, newIndex).filter(
                (el: DataType) => !!el,
            );
            setDataSource(newData);
        }
    };


    const DraggableContainer = (props: SortableContainerProps) => (
        <SortableBody
            useDragHandle
            disableAutoscroll
            helperClass="row-dragging"
            onSortEnd={onSortEnd}
            {...props}
        />
    );

    const DraggableBodyRow: React.FC<any> = ({ className, style, ...restProps }) => {
        // function findIndex base on Table rowKey props and should always be a right array index
        const index = dataSource.findIndex(x => x.index === restProps['data-row-key']);
        return <SortableItem index={index} {...restProps} />;
    };


    return (
        <>
            <Drawer
                width={600}
                title="新增分组"
                placement="right"
                onClose={() => setrightVisible(false)}
                visible={rightVisible}>
                <Form
                    form={form}
                    onFinish={async (rows: any) => console.log(rows)}
                >
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="departmentName"
                                label="分组名称"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入分组名称'
                                    }]}
                            >
                                <Input maxLength={10} showCount placeholder="分组名称（必填）" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.List name="sights">
                                {(fields, { add, remove }) => (
                                    <div>

                                        <Form.Item>
                                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                                添加判断条件
                                            </Button>
                                        </Form.Item>
                                        {fields.map(field => (
                                            <Space key={field.key} align="baseline">
                                                <Row gutter={16}>
                                                    <Col span={11}>
                                                        <Form.Item
                                                            noStyle
                                                            shouldUpdate={(prevValues, curValues) =>
                                                                prevValues.area !== curValues.area || prevValues.sights !== curValues.sights
                                                            }
                                                        >
                                                            {() => (
                                                                <Form.Item
                                                                    {...field}
                                                                    label="Sight"
                                                                    name={[field.name, 'sight']}
                                                                    rules={[{ required: true, message: 'Missing sight' }]}
                                                                >
                                                                    <Select disabled={!form.getFieldValue('area')} style={{ width: 130 }}>
                                                                        {(sights[form.getFieldValue('area') as SightsKeys] || []).map(item => (
                                                                            <Option key={item} value={item}>
                                                                                {item}
                                                                            </Option>
                                                                        ))}
                                                                    </Select>
                                                                </Form.Item>
                                                            )}
                                                        </Form.Item>
                                                    </Col>

                                                    <Col span={11}>
                                                        <Form.Item
                                                            {...field}
                                                            label="Price"
                                                            name={[field.name, 'price']}
                                                            rules={[{ required: true, message: 'Missing price' }]}
                                                        >
                                                            <Input />
                                                        </Form.Item>
                                                    </Col>

                                                    <Col span={1}>
                                                        <MinusCircleOutlined onClick={() => remove(field.name)} />
                                                    </Col>

                                                </Row>
                                            </Space>
                                        ))}
                                    </div>
                                )}
                            </Form.List>
                        </Col>
                    </Row>
                </Form>
            </Drawer>
            <Modal width={680} title="分组管理" visible={props.isModalVisible} onOk={() => props.onClose()} onCancel={() => props.onClose()}>
                <div className='flex_row_sb mar_b10'>
                    <div>
                        分组总数：{data.length}
                    </div>
                    <div className='admin_color cursor' onClick={() => setrightVisible(true)}>
                        + 新增分组
                    </div>
                </div>

                <Table
                    pagination={false}
                    dataSource={dataSource}
                    columns={columns}
                    rowKey="index"
                    components={{
                        body: {
                            wrapper: DraggableContainer,
                            row: DraggableBodyRow,
                        },
                    }}
                />
            </Modal>
        </>
    );
};

export default HomeModal;