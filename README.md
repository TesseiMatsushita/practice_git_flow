# Git練習用 電卓アプリ

友人とのGit練習用に作った、シンプルな電卓Webアプリです。  
HTML / CSS / JavaScriptだけで動きます。

## 起動方法

`index.html` をブラウザで開くだけで動きます。

VS Codeを使う場合は、拡張機能の **Live Server** を使うと便利です。

## 最初にやるGit練習

### 1. 最初の人がGitHubへpushする

```bash
git init
git add .
git commit -m "簡易電卓アプリを作成"
git branch -M main
git remote add origin GitHubのリポジトリURL
git push -u origin main
```

### 2. まさおさんがcloneする

```bash
git clone GitHubのリポジトリURL
cd calculator-git-practice
```

### 3. まさおさんがブランチを作る

```bash
git checkout -b feature/round-buttons
```

### 4. ボタンを丸くする

`styles.css` の `.key` にあるここを変更します。

```css
border-radius: 10px;
```

これを例えばこうします。

```css
border-radius: 999px;
```

### 5. commitしてpushする

```bash
git status
git add styles.css
git commit -m "電卓ボタンを丸く変更"
git push origin feature/round-buttons
```

### 6. GitHubでPull Requestを作る

`feature/round-buttons` から `main` に向けてPull Requestを作ります。

## 練習の目的

- clone
- branch
- commit
- push
- Pull Request
- merge

この流れを小さく体験することです。
