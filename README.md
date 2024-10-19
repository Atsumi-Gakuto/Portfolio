# Portfolio
私（[渥美岳大](https://github.com/Atsumi-Gakuto)）のポートフォリオサイトを作成するレポジトリです。

https://atsumi-gakuto.github.io/Portfolio/portfolio.html

## ページ構成
### ヘッダー
画面最上部に固定で表示されている黒い帯です。
左側にページタイトルと右側に見出しボタンがあります。
見出しボタンの他には、このレポジトリへ遷移するGitHubボタンがあります。
スマートフォンで閲覧中など、ページの横幅が狭い場合は、見出しボタンはハンバーガーメニューに圧縮されます。

### ABOUT
私について基本的な情報と写真が記載されています。
年齢と学年はコンピューターの時刻に応じて自動的に設定されます（つまり、卒業後もページを放置していると学年が凄いことになる）。
また、写真下には私への連絡リンクが記載されています。

### SKILLS
私が扱ったことがある技術を羅列しています。
ここに表示されるデータは`./src/data/skills.json`から取得します。

### WORKS
私が制作した・携わった主な制作物を羅列しています。
それぞれの制作物には記事が書かれており、ここに表示されているのはサムネイルとなっています。
サムネイルには、制作物の画像（ないものもある）・タイトル・簡単な説明・記事に付けられたタグが記載されています。
サムネイルの「MORE」ボタンをクリックすると記事本文を表示します。

このセクションの初めの方にタグ検索があります。
タグ検索には、記事のタグが羅列されているので、それらをクリックし選択すると、選択したタグを全て含む記事のみをフィルタリングして表示します。

なお、記事は`./src/data/works.json`、タグは`./src/data/tags.json`から取得します。

### 記事ポップアップ
記事の「MORE」ボタンを押すとページ最前部に表示されます。
これが表示される前に受け取ったデータを基に記事を表示します。
ポップアップ内には上から、サムネイル画像・記事タイトル・記事本文・記事のタグ・閉じるボタンが表示されています。
枠外か閉じるボタンをクリックするとポップアップを閉じます。

## ページのデータ追加
スキル・制作物の記事・記事に付けるタグは`./src/data/`内にあるJSONファイルに編集することで編集します。

### skills.json
「SKILLS」セクションに羅列する情報を定義します。

```
<root>
└ <Array>
  ├ name: string
  └ icon: string|null
```

| シンボル | 型 | 説明 |
| - | - | - |
| name | string | スキルの表示名 |
| icon | string\|null | スキルのアイコン。`./src/images/skill_icons/`内にあるファイル名を指定する。"null"にするとデフォルトのアイコンが充てられる。 |

### works.json
「WORKS」セクションにある記事の情報を定義します。

```
<root>
└ <Array>
  ├ thumbnail: string|null
  ├ title: string
  ├ description: string
  ├ tags: array
  │ └ tag_name: string
  └ article: string
```

| シンボル | 型 | 説明 |
| - | - | - |
| thumbnail | string\|null | 記事のサムネイル画像。`./src/images/article_thumbnails/`内にあるファイル名を指定する。"null"にすると「No Image」と表示する。 |
| title | string | 記事のタイトル |
| description | string | 記事の概要。簡潔な1文を推奨。 |
| tags | string[] | 記事に付けるタグの配列 |
| tag_name | string | 記事に付けるタグのキー名。タグは`./src/data/tags.json`で定義する。 |
| article | string | 記事の本文が書かれているhtmlファイル。`./src/article_html/`内にあるファイル名を指定する。 |

### tags.json
「WORKS」セクション内の記事に付けるタグを定義します。

```
<root>
└ tag_name
  ├ display_name: string
  └ color: string|null
```

| シンボル | 型 | 説明 |
| - | - | - |
| tag_name | | タグのキー名。`./src/data/works.json`内の`tag_name`にはこの値を入力する。 |
| display_name | string | タグの表示名 |
| color | string\|null | タグの色。HEX値で指定する（例：#FF0000）。"null"にするとデフォルトの色が充てられる。 |