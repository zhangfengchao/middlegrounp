import { AutoComplete, Input, Select, Space, DatePicker } from 'antd';
import React, { useEffect } from 'react';
import { SearchComType } from '../interfaceCom/InterfaceCom';
const { Option } = Select;

const SearchCom: React.FC<SearchComType> = (props) => {
    const children: React.ReactNode[] = []
    for (let i of props.optionChildren) {
        children.push(<Option key={i.value}>{i.label}</Option>)
    }
    useEffect(() => {
        // console.log(props, "search");

        return () => {

        }
    }, [props])

    return <Space id='searchCom'>
        {
            props.label ? <span className='size8'> {props.label}：</span> : <></>
        }

        <Input.Group compact>
            <Select
                showSearch
                filterOption={(input, option) => (option!.children as unknown as string).includes(input)}

                defaultValue="=="
                style={{ width: '30%' }}
            >
                {children}
            </Select>

            {
                props.type === 1 ? <Input
                    style={{ width: '70%' }}
                    placeholder={props.placeholder}
                /> : <></>
            }

            {
                props.type === 2 ? <DatePicker
                    style={{ width: '70%' }}
                    placeholder={props.placeholder}
                /> : <></>
            }

            {
                props.type === 3 ? <AutoComplete
                    style={{ width: '70%' }}
                    placeholder={props.placeholder}
                    options={props.completeOption}
                /> : <></>
            }

            {
                props.type === 4 ? <Select
                    onChange={(e: any) => {
                        console.log(e)
                    }}

                    style={{ width: '70%' }}
                    filterOption={(input, option) => (option!.children as unknown as string).includes(input)}
                    placeholder={props.placeholder}
                    options={props.completeOption}
                /> : <></>
            }

        </Input.Group>
    </Space>
}

export default SearchCom;