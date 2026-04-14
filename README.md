git push -u origin main# 夏日柑檸茶 · GitHub Pages

何柑酸的個人委託價目表與畫作展示網站。

## 檔案結構

```
gsuan/
├── index.html              # 首頁（自我介紹 + 注意事項 + 價目表 + 內嵌作品瀏覽）
└── assets/
    ├── css/style.css       # 全站樣式
    ├── js/main.js          # 注意事項收合 + 分類瀏覽 + Lightbox + 漢堡選單
    └── images/
        ├── profile.jpg     # 大頭照
        ├── pixel-1~3.jpg   # 偽像素 Q 頭
        ├── lightcolor-1~3.jpg  # 淡彩半身塗鴉
        ├── composite-1~3.jpg   # 組合頁
        ├── cover-1~3.jpg       # 包兩天
        ├── halfbody-1~3.jpg    # 正比半身
        ├── fullbody-1~3.jpg    # 正比全身
        ├── vertical-1~3.jpg    # 立繪
        ├── polaroid-1~3.jpg    # 拍立得
        ├── chibi-1~3.jpg       # Q插
        └── watercolor-1~3.jpg  # 水彩
```

## 新增圖片

1. 將圖片放入 `assets/images/`
2. 建議格式：**WebP 或 JPG**，每張 < 500KB（可用 [Squoosh](https://squoosh.app/) 免費壓縮）
3. 在 `index.html` 的 `#inlineGalleryTrack` 區塊裡，複製一個 `<article class="gallery-card">` 並修改 `data-category`、`data-src`、`data-title` 及 `<img>` 路徑

## 本地預覽

```bash
# 方法一：Python（無需安裝）
python3 -m http.server 8000
# 開啟 http://localhost:8000

# 方法二：VS Code Live Server 擴充功能
# 右鍵 index.html → Open with Live Server
```

## 部署至 GitHub Pages

1. 建立 GitHub 倉庫並推送程式碼
2. 進入 **Settings → Pages**
3. Source 選 `main` 分支，資料夾選 `/ (root)`
4. 儲存後等約 1 分鐘即可上線

## 色彩調整

修改 `assets/css/style.css` 頂部的 CSS 變數即可快速換色：

```css
:root {
  --color-accent:   #1aafa8;  /* 主強調色（藍綠） */
  --color-accent-2: #56cfc2;  /* 次強調色（淺藍綠） */
  --color-bg:       #f0f9f7;  /* 背景色 */
}
```
