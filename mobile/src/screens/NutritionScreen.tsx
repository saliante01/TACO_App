import { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  LayoutAnimation,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors } from '../theme';
import AnimatedCard from '../components/AnimatedCard';

const CATEGORIES = [
  {
    id: 'avoid',
    title: 'Evitar o consumir muy poco',
    color: colors.accent,
    icon: 'close-circle',
    bgColor: colors.accentLight,
    items: [
      'Espinacas',
      'Kale / Col rizada',
      'Brócoli',
      'Coles de Bruselas',
      'Repollo / Col',
      'Perejil',
      'Albahaca',
      'Cilantro',
      'Acelga',
      'Hígado de res',
    ],
  },
  {
    id: 'moderate',
    title: 'Consumir con moderación',
    color: colors.warning,
    icon: 'alert-circle',
    bgColor: colors.warningLight,
    items: [
      'Lechuga',
      'Espárragos',
      'Apio',
      'Pepino',
      'Zanahoria',
      'Cebolla',
      'Champiñones',
      'Pimentón',
      'Palta (aguacate)',
      'Té verde',
    ],
  },
  {
    id: 'free',
    title: 'Libre consumo',
    color: colors.secondary,
    icon: 'checkmark-circle',
    bgColor: colors.secondaryLight,
    items: [
      'Arroz',
      'Pastas',
      'Pan blanco',
      'Papa',
      'Frutas (manzana, pera, plátano)',
      'Lácteos',
      'Huevos',
      'Pollo',
      'Pescado',
      'Legumbres (con moderación)',
    ],
  },
];

export default function NutritionScreen() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggleCategory = useCallback((id: string) => {
    LayoutAnimation.configureNext({
      duration: 300,
      create: { type: 'easeInEaseOut', property: 'opacity' },
      update: { type: 'easeInEaseOut' },
    });
    setExpandedCategory((prev) => (prev === id ? null : id));
  }, []);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <AnimatedCard delay={100}>
        <View style={styles.vitaminKHeader}>
          <View style={styles.vitaminKIcon}>
            <Ionicons name="leaf" size={32} color={colors.secondary} />
          </View>
          <View style={styles.vitaminKInfo}>
            <Text style={styles.vitaminKTitle}>Vitamina K</Text>
            <Text style={styles.vitaminKDesc}>
              Los anticoagulantes orales actúan bloqueando la vitamina K.
              Mantener una ingesta constante de alimentos con vitamina K es
              clave para un tratamiento estable.
            </Text>
          </View>
        </View>
      </AnimatedCard>

      <Text style={styles.sectionTitle}>Clasificación de alimentos</Text>

      {CATEGORIES.map((cat, index) => {
        const isExpanded = expandedCategory === cat.id;
        return (
          <AnimatedCard key={cat.id} delay={150 + index * 100}>
            <TouchableOpacity
              onPress={() => toggleCategory(cat.id)}
              activeOpacity={0.7}
            >
              <View style={styles.categoryHeader}>
                <View
                  style={[styles.categoryIcon, { backgroundColor: cat.bgColor }]}
                >
                  <Ionicons name={cat.icon as any} size={24} color={cat.color} />
                </View>
                <View style={styles.categoryInfo}>
                  <Text style={styles.categoryTitle}>{cat.title}</Text>
                  <Text style={styles.categoryCount}>
                    {cat.items.length} alimentos
                  </Text>
                </View>
                <Ionicons
                  name={isExpanded ? 'chevron-up' : 'chevron-down'}
                  size={20}
                  color={colors.textSecondary}
                />
              </View>
            </TouchableOpacity>
            {isExpanded && (
              <View style={styles.foodList}>
                {cat.items.map((item, i) => (
                  <View key={i} style={styles.foodItem}>
                    <View style={[styles.foodDot, { backgroundColor: cat.color }]} />
                    <Text style={styles.foodText}>{item}</Text>
                  </View>
                ))}
              </View>
            )}
          </AnimatedCard>
        );
      })}

      <AnimatedCard delay={500}>
        <View style={styles.tipRow}>
          <Ionicons name="bulb" size={22} color={colors.warning} />
          <Text style={styles.tipText}>
            No elimines estos alimentos de tu dieta. La clave es mantener un
            consumo regular y consistente, no evitarlos por completo.
          </Text>
        </View>
      </AnimatedCard>

      <View style={{ height: 32 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  vitaminKHeader: {
    flexDirection: 'row',
    gap: 14,
  },
  vitaminKIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: colors.secondaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  vitaminKInfo: {
    flex: 1,
  },
  vitaminKTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  vitaminKDesc: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginHorizontal: 20,
    marginBottom: 12,
    marginTop: 4,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryInfo: {
    flex: 1,
    marginLeft: 14,
  },
  categoryTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
  },
  categoryCount: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  foodList: {
    marginTop: 14,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  foodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  foodDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  foodText: {
    fontSize: 14,
    color: colors.text,
  },
  tipRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  tipText: {
    fontSize: 13,
    color: colors.textSecondary,
    flex: 1,
    lineHeight: 18,
  },
});
