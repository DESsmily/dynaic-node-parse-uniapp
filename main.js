const fs = require('node:fs');

/**
 * 生成模板内容
 * @param {string} nodeListName - 节点列表名称
 * @param {string} itemName - 循环变量名称
 * @param {string[]} extendTag - 自定义标签
 * @param {string} bindFormName - 绑定表单名称
 * @param {string=} separ
 * @param {string=} nativeTagextendedProperties - 自定义标签
 * @param {string=} numberOfCycles - 循环次数 默认2
 */
const GeneratorNodeContent = (nodeListName, itemName, extendTag = [], bindFormName = '', nativeTagextendedProperties = {}, numberOfCycles = 2) => {

    const count = numberOfCycles - 1

    let nativeTag = Reflect.ownKeys(nativeTagextendedProperties)



    let str = `<template v-for="${itemName} in ${nodeListName}">\n`

    const mergeTag = [...nativeTag, ...extendTag]
    mergeTag.forEach((tag) => {

        let tempStr = ''
        const conf = nativeTagextendedProperties[tag] || {}
        if (nativeTag.includes(tag)) {
            const properStr = Reflect.ownKeys((conf.props || {})).map((key) => {
                if (key === 'v-model' || key === 'vModel') {
                    return `:${key}="${bindFormName}[${conf.props[key]}]"`
                }
                return `:${key}="${itemName}.${conf.props[key]}"`
            }).join(' ')
            tempStr += `<${tag} v-if="${itemName}.name === '${tag}'" ${properStr} ${conf.single ? '/' : ''}>`
        } else {
            tempStr = `<${tag} v-if="${itemName}.name === '${tag}'" v-model="${bindFormName}[${itemName}.field]" v-bind="${itemName}.props">`
            tempStr += `\n\t{{ ${itemName}.value }}`
            if (itemName && count && !conf.single) {
                tempStr += `\n\t\t${GeneratorNodeContent(`${itemName}.children`, 'subItem', extendTag, bindFormName, nativeTagextendedProperties, count)}\n`
            }

            !conf.single && (tempStr += `\n</${tag}>\n`)

        }



        str += tempStr
    })

    str += '\n</template>\n'

    return str
}


const nodes = [
    {
        "name": "view",
        "props": {
            "style": {
                "display": "flex",
                "align-items": "flex-start",
                "columnGap": "5rpx"
            }
        },
        "children": [
            {
                "name": "text",
                "props": {
                    "style": {
                        "fontSize": "28rpx",
                        "color": "red"
                    }
                },
                "value": "*"
            },
            {
                "name": "text",
                "props": {
                    "style": {
                        "fontSize": "28rpx"
                    }
                },
                "value": "范围类型"
            }
        ]
    },
    {
        "name": "wd-select",
        "field": "80field101",
        "props": {
            "placeholder": "请选择范围类型",
            "columns": [
                {
                    "label": "选项一",
                    "value": 1
                },
                {
                    "label": "选项二",
                    "value": 2
                }
            ]
        },
        "value": ""
    },
    {
        "name": "view",
        "props": {
            "style": {
                "display": "flex",
                "align-items": "flex-start",
                "columnGap": "5rpx"
            }
        },
        "children": [
            {
                "name": "text",
                "props": {
                    "style": {
                        "fontSize": "28rpx",
                        "color": "red"
                    }
                },
                "value": "*"
            },
            {
                "name": "text",
                "props": {
                    "style": {
                        "fontSize": "28rpx"
                    }
                },
                "value": "面积"
            }
        ]
    },
    {
        "name": "input",
        "field": "80field103",
        "props": {
            "placeholder": "请输入面积"
        },
        "value": ""
    },
    {
        "name": "view",
        "props": {
            "style": {
                "display": "flex",
                "align-items": "flex-start",
                "columnGap": "5rpx"
            }
        },
        "children": [
            {
                "name": "text",
                "props": {
                    "style": {
                        "fontSize": "28rpx",
                        "color": "red"
                    }
                },
                "value": "*"
            },
            {
                "name": "text",
                "props": {
                    "style": {
                        "fontSize": "28rpx"
                    }
                },
                "value": "房屋年龄"
            }
        ]
    },
    {
        "name": "input",
        "field": "80field105",
        "props": {
            "placeholder": "请输入房屋年龄"
        },
        "value": ""
    },
    {
        "name": "view",
        "props": {
            "style": {
                "display": "flex",
                "align-items": "flex-start",
                "columnGap": "5rpx"
            }
        },
        "children": [
            {
                "name": "text",
                "props": {
                    "style": {
                        "fontSize": "28rpx",
                        "color": "red"
                    }
                },
                "value": "*"
            },
            {
                "name": "text",
                "props": {
                    "style": {
                        "fontSize": "28rpx"
                    }
                },
                "value": "已装修年限"
            }
        ]
    },
    {
        "name": "input",
        "field": "80field106",
        "props": {
            "placeholder": "请输入已装修年限"
        },
        "value": ""
    },
    {
        "name": "view",
        "props": {
            "style": {
                "display": "flex",
                "align-items": "flex-start",
                "columnGap": "5rpx"
            }
        },
        "children": [
            {
                "name": "text",
                "props": {
                    "style": {
                        "fontSize": "28rpx",
                        "color": "red"
                    }
                },
                "value": "*"
            },
            {
                "name": "text",
                "props": {
                    "style": {
                        "fontSize": "28rpx"
                    }
                },
                "value": "装修预算"
            }
        ]
    },
    {
        "name": "input",
        "field": "80field107",
        "props": {
            "placeholder": "请输入装修预算"
        },
        "value": ""
    },
    {
        "name": "view",
        "props": {
            "style": {
                "display": "flex",
                "align-items": "flex-start",
                "columnGap": "5rpx"
            }
        },
        "children": [
            {
                "name": "text",
                "props": {
                    "style": {
                        "fontSize": "28rpx",
                        "color": "red"
                    }
                },
                "value": "*"
            },
            {
                "name": "text",
                "props": {
                    "style": {
                        "fontSize": "28rpx"
                    }
                },
                "value": "装修风格"
            }
        ]
    },
    {
        "name": "input",
        "field": "80field108",
        "props": {
            "placeholder": "请输入装修风格"
        },
        "value": ""
    },
    {
        "name": "view",
        "props": {
            "style": {
                "display": "flex",
                "align-items": "flex-start",
                "columnGap": "5rpx"
            }
        },
        "children": [
            {
                "name": "text",
                "props": {
                    "style": {
                        "fontSize": "28rpx",
                        "color": "red"
                    }
                },
                "value": "*"
            },
            {
                "name": "text",
                "props": {
                    "style": {
                        "fontSize": "28rpx"
                    }
                },
                "value": "辅材购买方式"
            }
        ]
    },
    {
        "name": "wd-select",
        "field": "80field109",
        "props": {
            "placeholder": "请选择辅材购买方式",
            "columns": [
                {
                    "label": "选项一",
                    "value": 1
                },
                {
                    "label": "选项二",
                    "value": 2
                }
            ]
        },
        "value": ""
    },
    {
        "name": "view",
        "props": {
            "style": {
                "display": "flex",
                "align-items": "flex-start",
                "columnGap": "5rpx"
            }
        },
        "children": [
            {
                "name": "text",
                "props": {
                    "style": {
                        "fontSize": "28rpx",
                        "color": "red"
                    }
                },
                "value": "*"
            },
            {
                "name": "text",
                "props": {
                    "style": {
                        "fontSize": "28rpx"
                    }
                },
                "value": "主材购买方式"
            }
        ]
    },
    {
        "name": "wd-select",
        "field": "80field110",
        "props": {
            "placeholder": "请选择主材购买方式",
            "columns": [
                {
                    "label": "选项一",
                    "value": 1
                },
                {
                    "label": "选项二",
                    "value": 2
                }
            ]
        },
        "value": ""
    }
]


const extendTag = ['button', 'input', 'textarea', 'radio-group', 'radio', 'checkbox-group', 'checkbox', 'datetime-picker']

const nativeTagextendedProperties = {
    input: {
        single: true,
        props: {
            type: 'type',
            placeholder: 'placeholder',
            'v-model': 'field'
        }
    },
    textarea: {
        single: true,
        props: {
            type: 'type',
            placeholder: 'placeholder',
            'v-model': 'field'
        }
    },
    switch: {
        single: true,
        props: {
            type: 'type',
            placeholder: 'placeholder',
            'v-model': 'field'
        }
    },
    checkbox: {
        single: true,
        props: {
            type: 'type',
            placeholder: 'placeholder',
            'v-model': 'field'
        }
    },
    radio: {
        single: true,
        props: {
            type: 'type',
            placeholder: 'placeholder',
            'v-model': 'field'
        }
    },
}

const s = GeneratorNodeContent('nodes', 'item', extendTag.map(tag => (`wt-${tag}`)), 'formData', nativeTagextendedProperties)
console.log(s);


fs.writeFileSync('template.vue', `\n<template>\n\t<div>\n\t\t${s}\n\t</div>\n</template>\n<script setup>\n\tconst nodes = []\n</script>`);