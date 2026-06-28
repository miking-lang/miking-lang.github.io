import { DocBlock, Signature, Description, ToggleWrapper, S} from '@site/docs/Stdlib/MikingDocGen';
import Search from '@site/docs/Stdlib/Search';

<Search />
# html-header.mc  
  

\# HTML Theme Header  
  
Provides a theme record \(\`HtmlTheme\`\) and a helper \(\`getHeader\`\) that returns  
the full HTML \`\<head\>\`, embedded \`\<style\>\`, and opening \`\<body\>\` markup using  
the theme’s colors. This is consumed by the HTML renderer.

  
  
## Stdlib Includes  
  
<a href={"/docs/Stdlib/docgen/rendering/renderers/headers/search.mc"} style={S.link}>./search.mc</a>, <a href={"/docs/Stdlib/docgen/rendering/renderers/headers/html-script.mc"} style={S.link}>./html-script.mc</a>, <a href={"/docs/Stdlib/docgen/rendering/renderers/headers/html-style.mc"} style={S.link}>./html-style.mc</a>, <a href={"/docs/Stdlib/string.mc"} style={S.link}>string.mc</a>  
  
## Variables  
  

          <DocBlock title="getHeader" kind="let">

```mc
let getHeader title : String -> String
```

<Description>{`Build the HTML header \+ styles \+ opening body using a theme and a page title.`}</Description>


<ToggleWrapper text="Code..">
```mc
let getHeader : String -> String = lam title.
    join [
"<!DOCTYPE html>
<html lang=\"en\">
<head>
<meta charset=\"utf-8\">
<title>", title, "</title>
<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">
<link rel=\"stylesheet\" href=\"/", htmlStylePath , "\">
</head>
<body>
<div class=\"main-container\">
<button class=\"theme-toggle\" id=\"themeButton\"></button>
<div id=\"themeMenu\" style=\"display:none;\">
  <button data-theme=\"htmlLight\">Light</button>
  <button data-theme=\"htmlDark\">Dark</button>
  <button data-theme=\"htmlWarm\">Warm</button>
  <button data-theme=\"htmlWarmDark\">Warm Dark</button>
</div>
", searchHtml, "
<script src=\"/", htmlScriptPath, "\"></script>
<script src=\"/", searchPath "js", "\"></script>
"]
```
</ToggleWrapper>
</DocBlock>

