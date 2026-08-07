namespace $ {

	$mol_test( {

		'query string drops empty and undefined params'() {
			$mol_assert_equal( $realworld_api.query( { tag: 'js', limit: 10, offset: undefined } ), '?tag=js&limit=10' )
			$mol_assert_equal( $realworld_api.query( { tag: '', author: undefined } ), '' )
		},

		'query string escapes values'() {
			$mol_assert_equal( $realworld_api.query( { tag: 'c++ & co' } ), '?tag=c%2B%2B%20%26%20co' )
		},

		'filter query keeps a stable key order regardless of call order'() {
			$mol_assert_equal(
				$realworld_api.filter_query( { limit: 10, tag: 'js', offset: 20 } ),
				'?tag=js&limit=10&offset=20',
			)
		},

		'validation errors flatten into readable lines'() {
			const error = new $realworld_api_error( 422, { email: [ "can't be blank" ], password: [ 'is too short' ] } )
			$mol_assert_equal( error.message, "email can't be blank\npassword is too short" )
			$mol_assert_equal( error.code, 422 )
		},

		'response without an errors body falls back to the status code'() {
			$mol_assert_equal( new $realworld_api_error( 500, undefined ).message, 'HTTP Error 500' )
		},

	} )

}
