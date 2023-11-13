import path from 'path'
import dirTree from 'directory-tree'
import fs from 'fs-extra'

function toSidebarOption(tree = []) {
  if (!Array.isArray(tree)) return []

  return tree.map((v) => {
    if (v.children !== undefined) {
      return {
        text: v.name,
        collapsible: true,
        collapsed: true,
        items: toSidebarOption(v.children),
      }
    } else {
      return {
        text: v.name.replace('.md', ''),
        link: v.path.split('docs')[1].replace('.md', ''),
      }
    }
  })
}

function autoGetSidebarOptionBySrcDir(srcPath, title) {
  const srcDir = dirTree(srcPath, {
    extensions: /\.md$/,
    normalizePath: true,
  })

  return [
    {
      text: '我的博客',
      items: toSidebarOption(srcDir.children),
    },
  ]
}

const docsPathList = path.join(__dirname, '../../../docs/blog/')

const sidebar = autoGetSidebarOptionBySrcDir(docsPathList)
export default sidebar
