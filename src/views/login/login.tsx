import React, { useState, useRef, useEffect } from 'react'
import { Divider, Input, Form, Button, Checkbox, Space, message } from 'antd'
import type { FormInstance } from 'antd'
import axiosFunc from '@/axios/axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { countIncrementAction } from '@/redux/count_action_creator'
import hex_md5 from '@/utils/md5'
import { Debounced } from '@/utils/utils'

const Login: React.FC = () => {
    const nav = useNavigate()
    const dispatch = useDispatch()
    const formRef = React.createRef<FormInstance>();
    const [phoneNumber, setphoneNumber] = useState()
    const timer = useRef<NodeJS.Timeout>()
    const [timerNumber, settimerNumber] = useState(30)
    const nums = useRef<number>(30)

    useEffect(() => {
        return () => {
            clearInterval(timer.current)
        }
    }, [])

    const getPassword = async () => {
        if (!phoneNumber) {
            message.error("请先输入登录名 :)")
            return
        }

        const res = await axiosFunc({
            url: 'getPassword',
            method: 'GET',
            data: {
                phoneNumber
            }
        })

        if (res.code === 200) {
            message.success(res.message)
            timer.current = setInterval(() => {
                nums.current--
                settimerNumber(nums.current)
                if (nums.current < 1) {
                    settimerNumber(30)
                    nums.current = 30
                    clearInterval(timer.current)
                }
            }, 1000)

        }
        else message.error(res.message)
    }

    const debounced: Function = new Debounced().use(getPassword, 500) //获取验证码防抖


    return <div className='flex_center page'>
        <div className='user_login'>
            <div className='login_top_box flex_c_center'>
                <div className='top_box flex_b'>
                    <div className='login_icons mar_b10'>
                        <img src={require('@/states/imgs/yirdoc.png')} alt="" />
                    </div>
                    <div className='size18 mar_b10'>
                        yirdoc中台
                    </div>
                    <div className='grey mar_b15'>
                        一站式销售方案解决平台
                    </div>
                    <Divider />
                </div>

                <div className='flex1 posr'>
                    <Form
                        labelCol={{
                            span: 5,
                        }}

                        className='login_user'
                        ref={formRef}
                        name="basic"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={async (e: FormInstance) => {
                            const res = await axiosFunc({
                                url: 'loginByAccountPassword',
                                method: 'POST',
                                data: {
                                    ...e,
                                    password: hex_md5((e as any).password)
                                }
                            })

                            if (res.code === 200) {
                                dispatch(countIncrementAction({
                                    userInfo: res.data
                                }))
                                nav('/', {
                                    replace: true
                                })
                            } else message.info(res.message)
                        }}
                        autoComplete="off"
                    >

                        <Form.Item
                            label="登录名"
                            name="phoneNumber"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入您的登录名后再试!',
                                },
                            ]}
                        >
                            <Input
                                onInput={(e: any) => setphoneNumber((e.target as any).value)}
                                style={{ width: '70%' }}
                                placeholder="请输入登录名"
                            // options={accountList}
                            />

                        </Form.Item>

                        <Form.Item
                            label="密码"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入您的密码后再试!',
                                },
                            ]}
                        >
                            <Space>
                                <Input placeholder='动态密码' />
                                <Button
                                    disabled={timerNumber !== 30}
                                    className='login_getPW'
                                    type={'primary'}
                                    onClick={async () => debounced()}>{timerNumber !== 30 ? timerNumber : '获取密码'}</Button>
                            </Space>
                        </Form.Item>

                        <Form.Item
                            name="remember"
                            valuePropName="checked"
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <Checkbox>记住登录名</Checkbox>
                        </Form.Item>

                        <div className='text_center'>
                            <Button type="primary" htmlType="submit">
                                登录
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    </div>

}

export default Login