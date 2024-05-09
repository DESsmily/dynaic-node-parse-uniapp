/** 动态节点模板配置 */
export interface GeneraterNodeContentOptions {
    name: string;
    props?: any;
    field?: string
    children?: GeneraterNodeContentOptions[]
}

/** 自定义标签配置 */
export interface CustomTagOptions {
    [x: string]: {
        /** 是否单标签 */
        single: boolean;
        /** 扩展属性 */
        props?: {
            [x: string]: any
        };
    }

}
