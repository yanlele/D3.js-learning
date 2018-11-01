## 地图基础


### Geographies (d3-geo)： 地理投影, 形状以及数学计算.

#### Paths

api | 说明
:- | :- 
d3.geoPath | 创建一个新的地理路径生成器.
path | 投影并渲染指定的地理特征.
path.area | 计算指定的二位地理特征面积.
path.bounds | 计算指定的二位地理特征包裹框.
path.centroid | 算指定的二位地理特征中心.
path.measure | 算指定的二位地理特征周长.
path.projection | 设置地理路径生成器的投影方式.
path.context | 设置渲染上下文.
path.pointRadius | 设置点特征的半径.


#### Projections

api | 说明
:- | :- 
**projection** | **将指定的球面上一点投影到平面.**
projection.invert | 逆转投影，根据平面一点反向计算球面坐标.
projection.stream | wrap the specified stream to project geometry.
projection.clipAngle | set the radius of the clip circle.
projection.clipExtent | set the viewport clip extent, in pixels.
projection.angle | set the post-projection rotation.
projection.scale | set the scale factor.
projection.translate | set the translation offset.
projection.fitExtent | set the scale and translate to fit a GeoJSON object.
projection.fitSize | set the scale and translate to fit a GeoJSON object.
projection.fitWidth | set the scale and translate to fit a GeoJSON object.
projection.fitHeight | set the scale and translate to fit a GeoJSON object.
projection.center | set the center point.
projection.rotate | set the three-axis spherical rotation angles.
projection.precision | set the precision threshold for adaptive sampling.
projection.preclip | set the spherical clipping stream transform.
projection.postclip | set the planar clipping stream transform.
d3.geoClipAntimeridian | cuts spherical geometries that cross the antimeridian.
d3.geoClipCircle | clips spherical geometries to a small circle.
d3.geoClipRectangle | clips planar geometries to a rectangular viewport.
d3.geoAlbers | the Albers equal-area conic projection.
d3.geoAlbersUsa | a composite Albers projection for the United States.
d3.geoAzimuthalEqualArea | the azimuthal equal-area projection.
d3.geoAzimuthalEquidistant | the azimuthal equidistant projection.
d3.geoConicConformal | the conic conformal projection.
d3.geoConicEqualArea | the conic equal-area (Albers) projection.
d3.geoConicEquidistant | the conic equidistant projection.
conic.parallels | set the two standard parallels.
d3.geoEquirectangular | the equirectangular (plate carreé) projection.
d3.geoGnomonic | the gnomonic projection.
d3.geoMercator | the spherical Mercator projection.
d3.geoOrthographic | the azimuthal orthographic projection.
d3.geoStereographic | the azimuthal stereographic projection.
d3.geoTransverseMercator | the transverse spherical Mercator projection.
project | project the specified point from the sphere to the plane.
project.invert | unproject the specified point from the plane to the sphere.
d3.geoProjection | create a custom projection.
d3.geoProjectionMutator | create a custom configurable projection.
d3.geoAzimuthalEqualAreaRaw | the raw azimuthal equal-area projection.
d3.geoAzimuthalEquidistantRaw | the raw azimuthal equidistant projection.
d3.geoConicConformalRaw | the raw conic conformal projection.
d3.geoConicEqualAreaRaw | the raw conic equal-area (Albers) projection.
d3.geoConicEquidistantRaw | the raw conic equidistant projection.
d3.geoEquirectangularRaw | the raw equirectangular (plate carreé) projection.
d3.geoGnomonicRaw | the raw gnomonic projection.
d3.geoMercatorRaw | the raw Mercator projection.
d3.geoOrthographicRaw | the raw azimuthal orthographic projection.
d3.geoStereographicRaw | the raw azimuthal stereographic projection.
d3.geoTransverseMercatorRaw | the raw transverse spherical Mercator projection.



#### Spherical Math

api | 说明
:- | :- 
d3.geoArea | 根据给定的地理特征计算球面面积.
d3.geoBounds | 根据指定的地理特征计算包裹框(经纬度).
d3.geoCentroid | 根据给定的地理特征计算球面中心.
d3.geoContains | 测试一个点是否在给定的地理特征轮廓内部.
d3.geoDistance | 计算两个点之间的大圆距离.
d3.geoLength | 计算一条线的长度或者多边形的周长.
d3.geoInterpolate | 在两个点之间沿着大圆进行插值.
d3.geoRotation | 根据指定的角度创建一个旋转函数.
rotation | 沿着指定的球面对指定点进行旋转.
rotation.invert | 计算某个点在旋转之前的点.


#### Spherical Shapes

api | 说明
:- | :- 
**d3.geoCircle** | **创建一个圆生成器.**
circle | 以分段的多边形的形式生成一个圆.
circle.center | 以经纬度的方式指定圆心.
circle.radius | 以度为单位指定圆的角半径.
circle.precision | 指定分段圆的精度.
**d3.geoGraticule** | **create a graticule generator.**
graticule | generate a MultiLineString of meridians and parallels.
graticule.lines | generate an array of LineStrings of meridians and parallels.
graticule.outline | generate a Polygon of the graticule’s extent.
graticule.extent | get or set the major & minor extents.
graticule.extentMajor | get or set the major extent.
graticule.extentMinor | get or set the minor extent.
graticule.step | get or set the major & minor step intervals.
graticule.stepMajor | get or set the major step intervals.
graticule.stepMinor | get or set the minor step intervals.
graticule.precision | get or set the latitudinal precision.
d3.geoGraticule10 | generate the default 10° global graticule.


#### Streams

api | 说明
:- | :- 
d3.geoStream | convert a GeoJSON object to a geometry stream.
stream.point | indicates a point with the specified coordinates.
stream.lineStart | indicates the start of a line or ring.
stream.lineEnd | indicates the end of a line or ring.
stream.polygonStart | indicates the start of a polygon.
stream.polygonEnd | indicates the end of a polygon.
stream.sphere | indicates the sphere.


#### Transforms

api | 说明
:- | :-
d3.geoIdentity | scale, translate or clip planar geometry.
identity.reflectX | reflect the x-dimension.
identity.reflectY | reflect the y-dimension.
d3.geoTransform | define a custom geometry transform.



### <div id="class08-01">01、中国地图</div>
#### 地理路径生成器

api | 说明
:- | :- 
d3.geoPath | 创建一个新的地理路径生成器.
path | 投影并渲染指定的地理特征.
path.area | 计算指定的二位地理特征面积.
path.bounds | 计算指定的二位地理特征包裹框.
path.centroid | 算指定的二位地理特征中心.
path.measure | 算指定的二位地理特征周长.
path.projection | 设置地理路径生成器的投影方式.
path.context | 设置渲染上下文.
path.pointRadius | 设置点特征的半径.

- 先看一个简单的示例： Demo1.ts
```typescript
class Demo1 extends Base {
    constructor() {
        super();
    }
    main() {
        // 地图投影
        let projection = geoMercator()
            .center([107, 31])
            .scale(700)
            .translate([this.width / 2, this.height / 2]);

        // 地理路径生成器
        let path = geoPath().projection(projection);

        let color = schemeCategory10;

        json('china.geojson')
            .then( (root: any) => {
                let groups = this.svg.append('g');
                let paths = groups.selectAll('path')
                    .data(root.features)
                    .enter()
                    .append('path')
                    .attr('class', 'province')
                    .style('fill', function (d: any, i: number) {
                        return color[i%10];
                    })
                    .attr('d', path);
            });
    }
}
```

- [Demo2: 点击某一省份， 显示出该省份的中心和边界框， 在控制台输出面积，中心， 边界信息](./Demo2.ts)

#### 形状生成器


