import cheerio from "cheerio";
import { ItemModel } from "../../models";

export class OlxParser {
	$: cheerio.Root;

	setDOM($: cheerio.Root) {
        this.$ = $;
    }

	getRequestPagesCount(): number {
		const count = this.$('.pager .item').length;

		return 0 === count ? 1 : count;
	}

	getNextRequestLinks(url, count): string[] {
		const links: string[] = [];

		for (let currentPage = 2; currentPage <= count; currentPage++) {
			links.push(`${url}&page=${currentPage}`);
		}

		return links;
	}

	getPageItems() {
		const listHandler = this.$('.listHandler');

		const items: ItemModel[] = [];

		if (!listHandler.length) {
			return items;
		}

		const htmlItems: cheerio.Cheerio = listHandler.find('.wrap');

		htmlItems.each((i, el) => {
			const $ = this.$;
			const $el = $(el);
			const $header = $el.find('h3 a');
			const $breadcrumbs = $el.find('.breadcrumb');
			const $img = $el.find('img');

			items.push({
				title: this.clearText($header.text()),
				url: $header.attr('href'),
				// image: (img?.src || '').replace(';s=644x461', ''),
				image: $img?.attr?.('src') || '',
				price: this.clearText($el.find('.price').text()),
				location: this.clearText($breadcrumbs.eq(1).text()),
				whenAdded: this.clearText($breadcrumbs.eq(2).text()),
			});
		});

		return items;
	}

	private clearText(text: string) {
		return text.replace('\n', '').trim();
	}
}
