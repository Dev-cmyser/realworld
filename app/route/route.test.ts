namespace $ {

	/** Round trip: parsing an address and writing it back must land on the same address. */
	function stable( path: string, search = '' ) {
		const dict = $realworld_app_route_parse( { path, search } )
		const back = $realworld_app_route_make( { ... $realworld_app_route_clean(), ... dict } )
		$mol_assert_equal( back.path, path )
		$mol_assert_equal( back.search, search )
	}

	$mol_test( {

		'named pages come from the first step of the path'() {
			$mol_assert_equal( $realworld_app_route_parse( { path: 'login', search: '' } ), { page: 'login' } )
			$mol_assert_equal( $realworld_app_route_parse( { path: 'register', search: '' } ), { page: 'register' } )
			$mol_assert_equal( $realworld_app_route_parse( { path: 'settings', search: '' } ), { page: 'settings' } )
		},

		'the editor works with and without an article'() {
			$mol_assert_equal( $realworld_app_route_parse( { path: 'editor', search: '' } ), { page: 'editor' } )
			$mol_assert_equal(
				$realworld_app_route_parse( { path: 'editor/how-to-train', search: '' } ),
				{ page: 'editor', slug: 'how-to-train' },
			)
		},

		'a profile carries its favorites tab'() {
			$mol_assert_equal(
				$realworld_app_route_parse( { path: 'profile/jane', search: '' } ),
				{ page: 'profile', user: 'jane' },
			)
			$mol_assert_equal(
				$realworld_app_route_parse( { path: 'profile/jane/favorites', search: '' } ),
				{ page: 'profile', user: 'jane', tab: 'favorites' },
			)
		},

		'the home feed is the fallback, and only there does the feed flag count'() {
			$mol_assert_equal( $realworld_app_route_parse( { path: '', search: '' } ), {} )
			$mol_assert_equal( $realworld_app_route_parse( { path: '', search: '?feed=following' } ), { tab: 'following' } )
			$mol_assert_equal( $realworld_app_route_parse( { path: 'tag/js', search: '' } ), { tag: 'js' } )
			$mol_assert_equal(
				$realworld_app_route_parse( { path: 'settings', search: '?feed=following' } ),
				{ page: 'settings' },
			)
		},

		'the first page is the absence of a page number'() {
			$mol_assert_equal( $realworld_app_route_parse( { path: '', search: '?page=1' } ), {} )
			$mol_assert_equal( $realworld_app_route_parse( { path: '', search: '?page=2' } ), { num: '2' } )
			$mol_assert_equal( $realworld_app_route_make( { num: '1' } ).search, '' )
			$mol_assert_equal( $realworld_app_route_make( { num: '2' } ).search, '?page=2' )
		},

		'slugs and names survive the trip through the address'() {
			const dict = { ... $realworld_app_route_clean(), page: 'article', slug: 'c++ & co' }
			const address = $realworld_app_route_make( dict )
			$mol_assert_equal( address.path, 'article/c%2B%2B%20%26%20co' )
			$mol_assert_equal( $realworld_app_route_parse( address ), { page: 'article', slug: 'c++ & co' } )
		},

		'every address from the routing spec survives a round trip'() {
			stable( '' )
			stable( '', '?feed=following' )
			stable( '', '?page=3' )
			stable( 'tag/js' )
			stable( 'tag/js', '?page=2' )
			stable( 'login' )
			stable( 'register' )
			stable( 'settings' )
			stable( 'editor' )
			stable( 'editor/how-to-train' )
			stable( 'article/how-to-train' )
			stable( 'profile/jane' )
			stable( 'profile/jane/favorites' )
		},

		'the feed flag and the page number stack up in the order the spec writes them'() {
			$mol_assert_equal(
				$realworld_app_route_make( { tab: 'following', num: '2' } ).search,
				'?feed=following&page=2',
			)
		},

	} )

}
