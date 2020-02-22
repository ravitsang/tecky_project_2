SELECT article.title, tag.name as tag_name, "user".id as user_id, article.user_id as author_id, article.created_at , article.id as article_id FROM "article"
                JOIN "user" on "user".id = article.user_id
                JOIN "tag_user" on tag_user.user_id = "user".id
                JOIN "tag" on tag_user.tag_id = tag.id;
              

SELECT article.title, article.content, "user".id, tag.name FROM article
    JOIN "user" on "user".id = article.user_id
    JOIN "article_tag" on article_tag.article_id =  article.id
    JOIN "tag" on tag.id = article_tag.tag_id
    WHERE tag.name = 'Programming' OR tag.name ='Life'


SELECT article.title from article
    WHERE to_tsvector(title) @@ plainto_tsquery('Cheerio');