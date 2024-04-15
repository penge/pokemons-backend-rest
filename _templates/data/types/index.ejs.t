---
to: src/generated/index.ts
force: true
---

export enum Type {<% types.forEach((type) => { %>
  <%= type -%><%- ` = "${type}",` -%>
<% }); %>
}

export enum Classification {<% classifications.forEach((classification) => { %>
  <%= classification.replaceAll(" ", "") -%><%- ` = "${classification}",` -%>
<% }); %>
}

export enum Dimension {<% dimensions.forEach((dimension) => { %>
  <%= dimension -%><%- ` = "${dimension.toLowerCase()}",` -%>
<% }); %>
}

export enum Move {<% moves.forEach((move) => { %>
  <%= move -%><%- ` = "${move.toLowerCase()}",` -%>
<% }); %>
}
