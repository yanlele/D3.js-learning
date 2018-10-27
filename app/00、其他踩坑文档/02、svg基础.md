## SVG基础


<table class="reference">
    <tbody>
    <tr>
        <th width="20%" align="left">元素</th>
        <th width="30%" align="left">说明</th>
        <th width="50%" align="left">属性</th>
    </tr>
    <tr>
        <td>&lt;a&gt;</td>
        <td>创建一个SVG元素周围链接</td>
        <td>xlink:show<br>
            xlink:actuate<br>
            xlink:href<br>
            target</td>
    </tr>
    <tr>
        <td>&lt;circle&gt;</td>
        <td>定义一个圆</td>
        <td>cx="圆的x轴坐标"<br>
            cy="圆的y轴坐标"<br>
            r="圆的半径". 必需.<br>
            <br>
            + 显现属性：颜色，FillStroke，图形</td>
    </tr>
    <tr>
        <td>&lt;clipPath&gt;</td>
        <td>用于隐藏位于剪切路径以外的对象部分。定义绘制什么和什么不绘制的模具被称为剪切路径 </td>
        <td>clip-path="引用剪贴路径和引用剪贴路径交叉"<br>
            clipPathUnits="userSpaceOnUse'或'objectBoundingBox"。第二个值childern一个对象的边框，会使用掩码的一小部分单位（默认："userSpaceOnUse"）"</td>
    </tr>
    <tr>
        <td>&lt;ellipse&gt;</td>
        <td>定义一个椭圆</td>
        <td>cx="椭圆x轴坐标"<br>
            cy="椭圆y轴坐标"<br>
            rx="沿x轴椭圆形的半径"。必需。<br>
            ry="沿y轴长椭圆形的半径"。必需。<br>
            <br>
            + 显现属性：颜色，FillStroke，图形</td>
    </tr>
    <tr>
        <td>&lt;g&gt;</td>
        <td>用于把相关元素进行组合的容器元素</td>
        <td>id="该组的名称"<br>
            fill="该组填充颜色"<br>
            opacity="该组不透明度"<br>
            <br>
            + 显现属性:<br>
            All</td>
    </tr>
    <tr>
        <td>&lt;image&gt;</td>
        <td>定义图像</td>
        <td>x="图像的左上角的x轴坐标"<br>
            y="图像的左上角的y轴坐标"<br>
            width="图像的宽度". 必须.<br>
            height="图像的高度". 必须.<br>
            xlink:href="图像的路径". 必须.<br>
            <br>
            + 显现属性:<br>
            Color, Graphics, Images, Viewports</td>
    </tr>
    <tr>
        <td>&lt;line&gt;</td>
        <td>定义一条线</td>
        <td>x1="直线起始点x坐标"<br>
            y1="直线起始点y坐标"<br>
            x2="直线终点x坐标"<br>
            y2="直线终点y坐标"<br>
            <br>
            + 显现属性:<br>
            Color, FillStroke, Graphics, Markers</td>
    </tr>
    <tr>
        <td>&lt;linearGradient&gt;</td>
        <td>定义线性渐变。通过使用矢量线性渐变填充对象，并可以定义为水平，垂直或角渐变。</td>
        <td>id="id 属性可为渐变定义一个唯一的名称。引用必须"<br>
            gradientUnits="'userSpaceOnUse' or 'objectBoundingBox'.使用视图框或对象，以确定相对位置矢量点。 （默认为'objectBoundingBox）"<br>
            gradientTransform="适用于渐变的转变"<br>
            x1="渐变向量x启动点（默认0％）"<br>
            y1="渐变向量y启动点（默认0％）" <br>
            x2="渐变向量x的终点。 （默认100％）"<br>
            y2="渐变向量y的终点。 （默认0％）" <br>
            spreadMethod="'pad' or 'reflect' or 'repeat'"<br>
            xlink:href="reference to another gradient whose attribute values are used as
            defaults and stops included. Recursive"</td>
    </tr>
    <tr>
        <td>&lt;marker&gt;</td>
        <td>标记可以放在直线，折线，多边形和路径的顶点。这些元素可以使用marker属性的"marker-start"，"marker-mid"和"marker-end"，继承默认情况下或可设置为"none"或定义的标记的URI。您必须先定义标记，然后才可以通过其URI引用。任何一种形状，可以把标记放在里面。他们绘制元素时把它们附加到顶部</td>
        <td>markerUnits="strokeWidth'或'userSpaceOnUse"。如果是strokeWidth"那么使用一个单位等于一个笔划宽度。否则，标记尺度不会使用同一视图单位作为引用元素（默认为'strokeWidth'）"<br>
            refx="标记顶点连接的位置（默认为0）"<br>
            refy="标记顶点连接的位置（默认为0）"<br>
            orient="'auto'始终显示标记的角度。 "auto"将计算某个角度使得X轴一个顶点的正切值（默认为0）<br>
            markerWidth="标记的宽度（默认3）"<br>
            markerHeight="标记的高度（默认3）"<br>
            viewBox="各点"看到"这个SVG绘图区域。由空格或逗号分隔的4个值。(min x, min y, width, height)" <br>
            <br>
            + presentation attributes:<br>
            All</td>
    </tr>
    <tr>
        <td>&lt;path&gt;</td>
        <td>定义一个路径</td>
        <td>d="定义路径指令"<br>
            pathLength="如果存在，路径将进行缩放，以便计算各点相当于此值的路径长度"<br>
            transform="转换列表"<br>
            <br>
            + 显现属性:<br>
            Color, FillStroke, Graphics, Markers</td>
    </tr>
    <tr>
        <td>&lt;polygon&gt;</td>
        <td>定义一个包含至少三边图形</td>
        <td>points="多边形的点。点的总数必须是偶数"。必需的。<br>
            fill-rule="FillStroke演示属性的部分"<br>
            <br>
            + 显现属性:<br>
            Color, FillStroke, Graphics, Markers</td>
    </tr>
    <tr>
        <td>&lt;polyline&gt;</td>
        <td>定义只有直线组成的任意形状</td>
        <td>points=折线上的"点"。必需的。<br>
            <br>
            + 显现属性:<br>
            Color, FillStroke, Graphics, Markers</td>
    </tr>
    <tr>
        <td>&lt;rect&gt;</td>
        <td>定义一个矩形</td>
        <td>x="矩形的左上角的x轴"<br>
            y="矩形的左上角的y轴"<br>
            rx="x轴的半径（round元素）"<br>
            ry="y轴的半径（round元素）" <br>
            width="矩形的宽度"。必需的。<br>
            height="矩形的高度"。必需的。<br>
            <br>
            + 显现属性:<br>
            Color, FillStroke, Graphics</td>
    </tr>
    <tr>
        <td>&lt;svg&gt;</td>
        <td>创建一个SVG文档片段</td>
        <td>x="左上角嵌入（默认为0）"<br>
            y="左上角嵌入（默认为0）"<br>
            width="SVG片段的宽度（默认为100％）"<br>
            height="SVG片段的高度（默认为100％）"<br>
            viewBox="点"seen"这个SVG绘图区域。由空格或逗号分隔的4个值。 (min x, min y, width, height)"<br>
            preserveAspectRatio="'none'或任何'xVALYVAL'的9种组合,VAL是"min"，"mid"或"max"。（默认情况下none）"<br>
            zoomAndPan="'magnify' or 'disable'.Magnify选项允许用户平移和缩放您的文件（默认Magnify ）"<br>
            xml="最外层&lt;svg&gt;元素都需要安装SVG和它的命名空间： xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve""<br>
            <br>
            + 显现属性:<br>
            All</td>
    </tr>
    <tr>
        <td>&lt;text&gt;</td>
        <td>定义一个文本</td>
        <td>x="列表的X -轴的位置。在文本中在第n个字符的位置在第n个x轴。如果后面存在额外的字符，耗尽他们最后一个字符之后放置的位置。 0是默认"<br>
            y="列表的Y轴位置。（参考x）0是默认"<br>
            dx="在字符的长度列表中移动相对最后绘制标志符号的绝对位置。（参考x）"<br>
            dy="在字符的长度列表中移动相对最后绘制标志符号的绝对位置。（参考x）" <br>
            rotate="一个旋转的列表。第n个旋转是第n个字符。附加字符没有给出最后的旋转值"<br>
            textLength="SVG查看器将尝试显示文本之间的间距/或字形调整的文本目标长度。（默认：正常文本的长度）"<br>
            lengthAdjust="告诉查看器，如果指定长度就尝试进行调整用以呈现文本。这两个值是'spacing'和'spacingAndGlyphs'"<br>
            <br>
            + 显现属性:<br>
            Color, FillStroke, Graphics, FontSpecification, TextContentElements</td>
    </tr>
    </tbody></table>