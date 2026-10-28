# 感官地圖 · 四頁整合版

Hengqin–Macau Sensory Atlas

主頁、Visual、Space、Sound 已整合，導覽順序為 Visual → Space → Sound。四頁共用暖白背景、炭黑文字、灰色分隔線與相同字體及 UI 規範。

## 上傳前先解壓

本 ZIP 是下載用的完整網站包。GitHub 不會將上傳的 ZIP 自動解壓成網站；請使用解壓後的內容。倉庫根目錄應直接看到 `index.html`、`visual/`、`space/`、`sound/`、`assets/` 和 `media/`。

每個網站檔案都小於 GitHub 網頁單檔上傳的 25 MiB 限制。整個網站超過 100 個檔案，建議使用 GitHub Desktop 一次提交。

## 推薦：GitHub Desktop

1. 在 GitHub 建立一個 Public 倉庫，例如 `sensory-atlas`。
2. 在 GitHub Desktop 使用 File → Clone repository，將剛建立的倉庫下載到電腦。
3. 開啟該倉庫資料夾，把本 ZIP 解壓後的全部內容複製進去。`index.html` 直接位於倉庫根目錄。
4. 在 GitHub Desktop 填寫摘要，例如 `Publish integrated sensory atlas`，按 Commit to main，再按 Push origin。
5. 在 GitHub 倉庫開啟 Settings → Pages。
6. Source 選 Deploy from a branch，Branch 選 main，資料夾選 /(root)，按 Save。
7. 發布完成後，分享 Pages 顯示的網址。觀眾可直接開啟網站，不需要登入 ChatGPT。

## 使用 GitHub 網頁上傳

可以分批透過 Add file → Upload files 上傳，每次選取不超過 100 個檔案，並保留資料夾結構。

- 根目錄：HTML、CSS、JS、favicon、shared 等。
- assets：主頁模型 5 個分塊及 model.json，全部保留原檔名。
- visual：包含兩個互動，以及 symbiosis-art 下的素材圖形；可進入資料夾分批上傳。
- space：自包含的 index.html 與發布標記。
- sound：原聲音程式、assets 內的圖片和 24 段錄音，以及額外影片入口 film.html。
- media：兩段影片、預覽圖、gallery.json 及 gallery 內 25 張網頁圖片。

接著按上面第 5–7 步設定 GitHub Pages。

## 網站內容

- 主頁的原模型可旋轉與縮放，頂部與模型上的三個項目入口均能跳轉。
- 普通滾輪向下瀏覽，Shift + 滾輪縮放主模型，另有縮放按鈕。
- 向下先展示原「1」資料夾的 16 秒循環影像，再展示三組圖片檔案。
- 三組圖片形成三個不同捲動速度的圖層，可互相遮擋、選取圖層、展開和放大閱讀。
- 01 空間 7 張、02 視覺 7 張、03 聲音 11 張，合計 25 張。
- Sound 類別另有約 71 秒的聲音影像。
- 減少動態效果模式下，圖像檔案以完整靜態網格呈現。

## 原交互與統計模式

Visual、Sound 的原始外部交互程式碼保持原樣，另外附加樣式統一介面。Space 保留原有事件與場景，僅調整背景色及手機直向的畫面取景比例。

Visual 原本的靜態演示模式仍然存在：選擇保存在當前瀏覽器，不能跨裝置匯總。GitHub Pages 不執行原 Python/SQLite 後端。

Sound 的 JPG 和 WAV 由觀眾瀏覽器生成；兩座城市的打孔、聆聽、音高選擇、切換及下載流程保留。

## 本機預覽

在解壓後、包含 index.html 的資料夾開啟終端機：

```sh
python3 -m http.server 8000
```

開啟 http://localhost:8000/。

## 編輯位置

- shared/ui.css：四頁共用的字體、背景、導覽和介面樣式。
- index.html、style.css、app.js：主頁內容、佈局與模型控制。
- editorial.css、editorial.js：影片、三層圖像檔案及展開閱讀。
- media/gallery.json：圖片分組與標題。
- visual/、space/、sound/：原有三個項目。

第三方函式庫授權見 licenses/。Sound 素材說明見 sound/CREDITS.md；Visual 原有來源頁保留於 visual/symbiosis-art/materials.html。

GitHub 官方設定文件：https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
