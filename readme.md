# openlayers地图导出工具
本文的实现思路来自openlayers管网中的示例。在官网示例的基础上进行调整、封装和功能扩展，形成本工具。
# 功能
- 导出为图片  
  ```
  mapExport.saveAsPng(map, extent, options)
  ```
  其中，  
  map： 地图对象。  
  extent： 可选，要导出的地图范围。默认全图导出。  
  options：可选，其它一些参数。  
    name： 导出图片的名字。  

- 打印地图  
  ```
  mapExport.saveAsPng(map, extent)
  ```
  