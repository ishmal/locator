const Locator = require("../src/locator");
const assert = require('assert');

const RES = 0.0001;

describe('Locator', () => {

	const locator = new Locator();

	describe('locator to lat lon',() => {

		const eq = (v, lat, lon) => {
			const xerr = Math.abs(v.cx - lon);
			assert( xerr < 0.0001 , `x: ${v.cx}, exp:${lon}`)
			const yerr = Math.abs(v.cy - lat);
			assert( yerr < 0.0001 , `y: ${v.cy}, exp:${lat}`)
		};
	
	
		it("test1", () => {
			const v = locator.locatorToLatLon("IO93lo72hn")
			eq(v, 53.593924, -1.022569);
		});

		it("test2", () => {
			const v = locator.locatorToLatLon("EM10ek00")
			eq(v, 30.416941, -97.663873);
		});


	});

	describe('lat lon to locator', () => {

		const eq = (exp, loc) => {
				assert(exp === loc, `exp: ${exp} loc: ${loc}`)
		}

		it("test3", () => {
			const v = locator.latLonToLocator(30.416941, -97.663873);
			eq("EM10ek00", v);
		});

	});


});



/*
def test_convert_from_maidenhead_IO93lo72hn
lat, lon = Maidenhead.to_latlon('IO93lo72hn')
assert_equal [ 53.593924, -1.022569 ], [ lat, lon ]
end

def test_convert_from_maidenhead_IO93lo72
lat, lon = Maidenhead.to_latlon('IO93lo72')
assert_equal [ 53.593576, -1.021181 ], [ lat, lon ]
end

def test_convert_from_maidenhead_IO93lo
lat, lon = Maidenhead.to_latlon('IO93lo')
assert_equal [ 53.606076, -1.037847 ], [ lat, lon ]
end

def test_convert_from_maidenhead_IO93
lat, lon = Maidenhead.to_latlon('IO93')
assert_equal [ 53.481076, -1.037847 ], [ lat, lon ]
end

def test_convert_from_maidenhead_IO
lat, lon = Maidenhead.to_latlon('IO')
assert_equal [ 55.481076, -9.037847 ], [ lat, lon ]
end

def test_convert_to_maidenhead_5
maidenhead = Maidenhead.to_maidenhead(53.593923, -1.022569, 5)
assert_equal 'IO93lo72hn', maidenhead
end

def test_convert_to_maidenhead_4
maidenhead = Maidenhead.to_maidenhead(53.593923, -1.022569, 4)
assert_equal 'IO93lo72', maidenhead
end

def test_convert_to_maidenhead_3
maidenhead = Maidenhead.to_maidenhead(53.593923, -1.022569, 3)
assert_equal 'IO93lo', maidenhead
end

def test_convert_to_maidenhead_2
maidenhead = Maidenhead.to_maidenhead(53.593923, -1.022569, 2)
assert_equal 'IO93', maidenhead
end

def test_convert_to_maidenhead_1
maidenhead = Maidenhead.to_maidenhead(53.593923, -1.022569, 1)
assert_equal 'IO', maidenhead
end

def test_convert_JJ00aa
lat, lon = Maidenhead.to_latlon('JJ00aa00aa')
assert_equal lat, 0
assert_equal lon, 0
end

def test_edges_0
maidenhead = Maidenhead.to_maidenhead(-90, -180, 5)
assert_equal 'AA00aa00aa', maidenhead
end

def test_edges_1
maidenhead = Maidenhead.to_maidenhead(90, -180, 5)
assert_equal 'AS00aa00aa', maidenhead
end

def test_edges_2
maidenhead = Maidenhead.to_maidenhead(90, 180, 5)
assert_equal 'SS00aa00aa', maidenhead
end

def test_edges_3
maidenhead = Maidenhead.to_maidenhead(-90, 180, 5)
assert_equal 'SA00aa00aa', maidenhead
end

def test_throws_for_invalid_maidenhead
assert_raises(ArgumentError) do
  Maidenhead.to_latlon('A')
end
end

def test_valid_maidenhead
matrix = {
  'AA' => true,
  'AA00' => true,
  'AA00AA' => true,
  'Rr99XX' => true,
  'rR99Xx99' => true,
  'RR99xX99Xx' => true,
  'RR99xX99xX' => true,

  12 => false,
  '' => false,
  nil => false,

  'A' => false,
  'A1' => false,
  '00' => false,
  'AA0' => false,
  'AAAA' => false,
  'AA0A' => false,
  'SS99' => false,
}
*/